// API Service for fetching drama data from NetShort
import { TheatersResponse, TheaterSection, DramaItem, ForYouResponse, SearchResponse, DramaDetailResponse } from '@/src/types';

// Base URL for NetShort API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://netshort.sansekai.my.id/api/netshort';

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': '*/*',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Drama API Functions
export const dramaApi = {
  /**
   * Get all theater sections with dramas
   */
  getTheaters: (): Promise<TheatersResponse> => fetchApi('/theaters'),

  /**
   * Get drama recommendations for user (For You page)
   * @param page - Page number (default: 1)
   */
  getForYou: (page: number = 1): Promise<ForYouResponse> =>
    fetchApi(`/foryou?page=${page}`),

  /**
   * Search dramas by query
   * @param query - Search query
   * @param page - Page number (default: 1)
   */
  search: (query: string, page: number = 1): Promise<SearchResponse> =>
    fetchApi(`/search?query=${encodeURIComponent(query)}&page=${page}`),

  /**
   * Get all episodes for a drama
   * @param shortPlayId - Drama ID
   */
  getAllEpisodes: (shortPlayId: string): Promise<DramaDetailResponse> =>
    fetchApi(`/allepisode?shortPlayId=${shortPlayId}`),

  /**
   * Get a specific section by content remark
   */
  getSectionByRemark: async (contentRemark: string): Promise<TheaterSection | undefined> => {
    const theaters = await fetchApi<TheatersResponse>('/theaters');
    return theaters.find(section => section.contentRemark === contentRemark);
  },

  /**
   * Get featured/hero drama
   */
  getHeroDrama: async (): Promise<DramaItem | undefined> => {
    const theaters = await fetchApi<TheatersResponse>('/theaters');
    const firstSection = theaters[0];
    if (firstSection && firstSection.contentInfos.length > 0) {
      return firstSection.contentInfos.reduce((max, item) =>
        item.heatScore > max.heatScore ? item : max
      );
    }
    return undefined;
  },
};

export default dramaApi;


