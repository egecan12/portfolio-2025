// GitHub API'yi çağırmak için yardımcı fonksiyonlar

// Yanıt cache'i için basit bir in-memory store
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 3600000; // 1 saat (milisaniye cinsinden)

// GitHub Repo tipini tanımla
export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
};

/**
 * Bir kullanıcının pinlediği GitHub repolarını getirir
 * @param username GitHub kullanıcı adı
 * @returns Promise<GithubRepo[]> Repolar dizisi
 */
export async function getPinnedRepos(username: string): Promise<GithubRepo[]> {
  const cacheKey = `pinned-repos-${username}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    // GraphQL API kullanarak pinlenmiş repoları sorgula
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.GITHUB_TOKEN || ''}`
      },
      body: JSON.stringify({
        query: `{
          user(login: "${username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  homepageUrl
                  primaryLanguage {
                    name
                  }
                  stargazerCount
                  forkCount
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                  createdAt
                  updatedAt
                  isFork
                }
              }
            }
          }
        }`
      })
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // GraphQL verisini GithubRepo tipine dönüştür
    const pinnedRepos: GithubRepo[] = data.data.user.pinnedItems.nodes.map((repo: any) => ({
      id: parseInt(repo.id.split('_').pop()),
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
      created_at: repo.createdAt,
      updated_at: repo.updatedAt,
      fork: repo.isFork
    }));
    
    // Sonuçları cache'le
    cache[cacheKey] = {
      data: pinnedRepos,
      timestamp: Date.now()
    };
    
    return pinnedRepos;
  } catch (error) {
    console.error('Error fetching pinned GitHub repos:', error);
    // Pinlenen repolar getirilemezse normal repoları al
    return getUserRepos(username);
  }
}

/**
 * Bir kullanıcının GitHub repolarını getirir ve star sayısına göre sıralar
 * @param username GitHub kullanıcı adı
 * @returns Promise<GithubRepo[]> Repolar dizisi
 */
export async function getUserRepos(username: string): Promise<GithubRepo[]> {
  const cacheKey = `user-repos-${username}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // GitHub API rate limiting'i aşmak için GITHUB_TOKEN environment variable'ı kullanılabilir
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GithubRepo[] = await response.json();
    
    // Fork olmayan repoları filtrele ve yıldız sayısına göre sırala
    const filteredRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6); // En popüler 6 repoyu al
    
    // Sonuçları cache'le
    cache[cacheKey] = {
      data: filteredRepos,
      timestamp: Date.now()
    };
    
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Bir reponun kullandığı programlama dillerini getirir
 * @param username GitHub kullanıcı adı
 * @param repo Repo adı
 * @returns Promise<Record<string, number>> Diller ve byte sayıları
 */
export async function getRepoLanguages(username: string, repo: string): Promise<Record<string, number>> {
  const cacheKey = `repo-languages-${username}-${repo}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/languages`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const languages = await response.json();
    
    // Sonuçları cache'le
    cache[cacheKey] = {
      data: languages,
      timestamp: Date.now()
    };
    
    return languages;
  } catch (error) {
    console.error('Error fetching repo languages:', error);
    return {};
  }
}

/**
 * Bir reponun README dosyasından ilk resmi bulur
 * @param username GitHub kullanıcı adı
 * @param repo Repo adı
 * @returns Promise<string | null> İlk resmin URL'si veya bulunamazsa null
 */
export async function getReadmeImage(username: string, repo: string): Promise<string | null> {
  const cacheKey = `readme-image-${username}-${repo}`;
  
  // Cache kontrolü
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    // README içeriğini çek
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const readmeContent = await response.text();
    
    // Markdown resim formatını bul: ![...](URL)
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = readmeContent.match(imageRegex);
    
    let imageUrl = null;
    
    if (match && match[1]) {
      imageUrl = match[1];
      
      // Göreceli URL'leri mutlak URL'lere dönüştür
      if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || !imageUrl.startsWith('http')) {
        imageUrl = `https://raw.githubusercontent.com/${username}/${repo}/main/${imageUrl.replace(/^\.\//, '')}`;
      }
    }
    
    // Sonucu cache'le
    cache[cacheKey] = {
      data: imageUrl,
      timestamp: Date.now()
    };
    
    return imageUrl;
  } catch (error) {
    console.error('Error fetching README image:', error);
    return null;
  }
}

/**
 * Repo bilgilerini ve README resmini içeren gelişmiş repo bilgilerini getirir
 * Bu fonksiyon önce pinlenen repoları almayı dener, eğer başarısız olursa
 * normal repoları getirir
 * @param username GitHub kullanıcı adı
 * @returns Promise<Array<GithubRepo & { readmeImage: string | null }>> Gelişmiş repo dizisi
 */
export async function getEnhancedUserRepos(username: string): Promise<Array<GithubRepo & { readmeImage: string | null }>> {
  try {
    // Önce pinlenen repoları almayı dene
    const repos = await getPinnedRepos(username);
    
    // Her repo için README resimlerini çek
    const enhancedRepos = await Promise.all(
      repos.map(async (repo) => {
        const readmeImage = await getReadmeImage(username, repo.name);
        return { ...repo, readmeImage };
      })
    );
    
    return enhancedRepos;
  } catch (error) {
    // Pinlenen repolar alınamazsa, normal repoları kullan
    console.error('Error fetching pinned repos, falling back to regular repos:', error);
    const repos = await getUserRepos(username);
    
    // Her repo için README resimlerini çek
    const enhancedRepos = await Promise.all(
      repos.map(async (repo) => {
        const readmeImage = await getReadmeImage(username, repo.name);
        return { ...repo, readmeImage };
      })
    );
    
    return enhancedRepos;
  }
} 