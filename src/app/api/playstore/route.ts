import { NextRequest, NextResponse } from 'next/server';

/**
 * Google Play Store'dan uygulama bilgilerini çeken API route
 * Developer ID veya App ID ile sorgulama yapılabilir
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const developerId = searchParams.get('developerId');
  const appId = searchParams.get('appId');

  try {
    if (developerId) {
      // Developer'ın tüm uygulamalarını getir
      const apps = await fetchDeveloperApps(developerId);
      return NextResponse.json(apps);
    } else if (appId) {
      // Belirli bir uygulamanın detaylarını getir
      const app = await fetchAppDetails(appId);
      return NextResponse.json(app);
    } else {
      return NextResponse.json(
        { error: 'developerId or appId parameter is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Play Store API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Play Store data' },
      { status: 500 }
    );
  }
}

/**
 * Developer'ın uygulamalarını Play Store'dan çeker
 */
async function fetchDeveloperApps(developerId: string) {
  const url = `https://play.google.com/store/apps/dev?id=${developerId}`;
  
  try {
    // Play Store sayfasını fetch et
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 3600 } // 1 saat cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // HTML'den uygulama bilgilerini parse et
    const apps = parsePlayStorePage(html, developerId);
    
    return apps;
  } catch (error) {
    console.error('Error fetching developer apps:', error);
    // Fallback: Boş array döndür
    return [];
  }
}

/**
 * Belirli bir uygulamanın detaylarını çeker
 */
async function fetchAppDetails(appId: string) {
  const url = `https://play.google.com/store/apps/details?id=${appId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const app = parseAppDetails(html, appId);
    
    return app;
  } catch (error) {
    console.error('Error fetching app details:', error);
    return null;
  }
}

/**
 * Play Store sayfasından uygulama bilgilerini parse eder
 */
function parsePlayStorePage(html: string, developerId: string): any[] {
  const apps: any[] = [];
  
  try {
    // JSON-LD structured data'yı bul
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    const matches = html.match(jsonLdRegex);
    
    if (matches) {
      for (const match of matches) {
        try {
          const jsonStr = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
          const data = JSON.parse(jsonStr);
          
          if (data['@type'] === 'SoftwareApplication' || Array.isArray(data)) {
            const appData = Array.isArray(data) ? data.find((item: any) => item['@type'] === 'SoftwareApplication') : data;
            
            if (appData) {
              apps.push({
                id: appData.applicationCategory || extractAppId(html, appData.name),
                title: appData.name || '',
                description: appData.description || '',
                icon: appData.image || '',
                rating: appData.aggregateRating?.ratingValue || 0,
                installCount: appData.aggregateRating?.ratingCount || '0',
                url: appData.url || '',
                developer: appData.author?.name || '',
                category: appData.applicationCategory || '',
              });
            }
          }
        } catch (e) {
          // JSON parse hatası, devam et
          continue;
        }
      }
    }
    
    // Eğer JSON-LD bulunamazsa, HTML'den manuel parse et
    if (apps.length === 0) {
      apps.push(...parseAppsFromHTML(html));
    }
    
    return apps;
  } catch (error) {
    console.error('Error parsing Play Store page:', error);
    return [];
  }
}

/**
 * HTML'den uygulama bilgilerini parse eder (fallback)
 */
function parseAppsFromHTML(html: string): any[] {
  const apps: any[] = [];
  
  // Play Store sayfasındaki app linklerini bul
  // Birden fazla pattern deniyoruz çünkü Play Store HTML yapısı değişebilir
  const patterns = [
    /<a[^>]*href="\/store\/apps\/details\?id=([^"&]+)"[^>]*>/g,
    /href="\/store\/apps\/details\?id=([^"&]+)"/g,
    /"\/store\/apps\/details\?id=([^"&]+)"/g,
  ];
  
  const seenIds = new Set<string>();
  
  for (const pattern of patterns) {
    const matches = [...html.matchAll(pattern)];
    
    for (const match of matches) {
      const appId = match[1];
      if (!appId || seenIds.has(appId) || appId.length < 3) continue;
      seenIds.add(appId);
      
      // App bilgilerini çıkar
      const title = extractTitle(html, appId) || appId;
      let iconUrl = extractIconUrl(html, appId);
      
      // Eğer icon bulunamazsa, app detail sayfasından çekmeyi dene (async olmadığı için şimdilik atlıyoruz)
      // Icon URL'ler genellikle developer sayfasında da bulunur
      
      apps.push({
        id: appId,
        title: title,
        description: extractDescription(html, appId),
        icon: iconUrl,
        rating: extractRating(html, appId),
        installCount: extractInstallCount(html, appId) || '0+',
        url: `https://play.google.com/store/apps/details?id=${appId}`,
        developer: '',
        category: '',
      });
    }
    
    if (apps.length > 0) break; // İlk başarılı pattern'den sonra dur
  }
  
  return apps;
}

/**
 * Icon URL'ini çıkarır
 */
function extractIconUrl(html: string, appId: string): string {
  // Play Store icon URL pattern'leri
  const iconPatterns = [
    // play-lh.googleusercontent.com pattern
    /https?:\/\/play-lh\.googleusercontent\.com\/[^"'\s]+/gi,
    // data-src veya src içinde icon
    /<img[^>]*(?:data-src|src)="([^"]*play-lh\.googleusercontent\.com[^"]*)"[^>]*>/i,
    // Genel img tag'leri
    /<img[^>]*src="([^"]*icon[^"]*)"[^>]*>/i,
    /<img[^>]*data-src="([^"]*icon[^"]*)"[^>]*>/i,
  ];
  
  for (const pattern of iconPatterns) {
    const matches = html.match(pattern);
    if (matches) {
      for (const match of matches) {
        if (typeof match === 'string' && match.includes('play-lh.googleusercontent.com')) {
          // URL'yi temizle ve boyut ekle
          let url = match.replace(/['"]/g, '');
          if (!url.includes('=w')) {
            url = url.split('?')[0] + '=w240-h240';
          }
          return url.startsWith('http') ? url : `https:${url}`;
        } else if (Array.isArray(match) && match[1]) {
          let url = match[1];
          if (url.includes('play-lh.googleusercontent.com')) {
            if (!url.includes('=w')) {
              url = url.split('?')[0] + '=w240-h240';
            }
            return url.startsWith('http') ? url : `https:${url}`;
          }
        }
      }
    }
  }
  
  return '';
}

/**
 * Açıklamayı çıkarır
 */
function extractDescription(html: string, appId: string): string {
  // Description pattern'lerini dene
  const descPattern = new RegExp(`<div[^>]*class="[^"]*description[^"]*"[^>]*>([^<]+)</div>`, 'i');
  const match = html.match(descPattern);
  return match ? match[1].trim().substring(0, 150) : '';
}

/**
 * Rating'i çıkarır
 */
function extractRating(html: string, appId: string): number {
  const ratingPattern = /(\d+\.?\d*)\s*(?:stars?|rating)/i;
  const match = html.match(ratingPattern);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Install count'u çıkarır
 */
function extractInstallCount(html: string, appId: string): string {
  const installPattern = /(\d+[\d,]*\+?)\s*(?:installs?|downloads?)/i;
  const match = html.match(installPattern);
  return match ? match[1] : '';
}

/**
 * App detail sayfasından icon URL'ini çeker
 */
async function fetchAppIcon(appId: string): Promise<string> {
  try {
    const url = `https://play.google.com/store/apps/details?id=${appId}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return '';
    }

    const html = await response.text();
    const iconUrl = extractIconUrl(html, appId);
    return iconUrl;
  } catch (error) {
    console.error(`Error fetching icon for ${appId}:`, error);
    return '';
  }
}

/**
 * App detaylarını parse eder
 */
function parseAppDetails(html: string, appId: string): any {
  try {
    // JSON-LD structured data'yı bul
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    const match = html.match(jsonLdRegex);
    
    if (match) {
      const jsonStr = match[0].replace(/<script type="application\/ld\+json">|<\/script>/g, '');
      const data = JSON.parse(jsonStr);
      
      if (data['@type'] === 'SoftwareApplication') {
        return {
          id: appId,
          title: data.name || '',
          description: data.description || '',
          icon: data.image || '',
          rating: data.aggregateRating?.ratingValue || 0,
          installCount: data.aggregateRating?.ratingCount || '0',
          url: data.url || `https://play.google.com/store/apps/details?id=${appId}`,
          developer: data.author?.name || '',
          category: data.applicationCategory || '',
        };
      }
    }
    
    // Fallback: HTML'den parse et
    return {
      id: appId,
      title: extractTitle(html, appId),
      description: '',
      icon: '',
      rating: 0,
      installCount: '0+',
      url: `https://play.google.com/store/apps/details?id=${appId}`,
      developer: '',
      category: '',
    };
  } catch (error) {
    console.error('Error parsing app details:', error);
    return null;
  }
}

/**
 * HTML'den app ID çıkarır
 */
function extractAppId(html: string, appName: string): string {
  const regex = new RegExp(`href="/store/apps/details\\?id=([^"]+)"[^>]*>.*?${appName}`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

/**
 * HTML'den başlık çıkarır
 */
function extractTitle(html: string, appId: string): string {
  const regex = new RegExp(`<a[^>]*href="/store/apps/details\\?id=${appId}"[^>]*>([^<]+)</a>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

