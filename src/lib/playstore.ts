// Google Play Store API helper functions

// Cache için basit bir in-memory store
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 3600000; // 1 saat (milisaniye cinsinden)

export type PlayStoreApp = {
  id: string;
  title: string;
  description: string;
  icon: string;
  rating: number;
  installCount: string;
  url: string;
  developer: string;
  category: string;
  screenshots?: string[];
};

/**
 * Google Play Store'dan bir developer'ın uygulamalarını getirir
 * @param developerId Developer ID (örn: "4826739613983721645")
 * @returns Promise<PlayStoreApp[]> Uygulamalar dizisi
 */
export async function getDeveloperApps(developerId: string): Promise<PlayStoreApp[]> {
  const cacheKey = `developer-apps-${developerId}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    // Play Store developer sayfasını çek
    const developerUrl = `https://play.google.com/store/apps/dev?id=${developerId}`;
    
    // Server-side fetch için API route kullanacağız
    // Client-side'da CORS sorunları olabileceği için API route oluşturuyoruz
    const response = await fetch(`/api/playstore?developerId=${developerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Play Store API error: ${response.status}`);
    }
    
    const apps: PlayStoreApp[] = await response.json();
    
    // Sonuçları cache'le
    cache[cacheKey] = {
      data: apps,
      timestamp: Date.now()
    };
    
    return apps;
  } catch (error) {
    console.error('Error fetching Play Store apps:', error);
    return [];
  }
}

/**
 * Belirli bir uygulamanın detaylarını getirir
 * @param appId Uygulama ID'si (package name)
 * @returns Promise<PlayStoreApp | null> Uygulama bilgisi
 */
export async function getAppDetails(appId: string): Promise<PlayStoreApp | null> {
  const cacheKey = `app-details-${appId}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    const response = await fetch(`/api/playstore?appId=${appId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Play Store API error: ${response.status}`);
    }
    
    const app: PlayStoreApp = await response.json();
    
    // Sonucu cache'le
    cache[cacheKey] = {
      data: app,
      timestamp: Date.now()
    };
    
    return app;
  } catch (error) {
    console.error('Error fetching app details:', error);
    return null;
  }
}

