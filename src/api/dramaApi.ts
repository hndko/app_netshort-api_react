// API Service for fetching drama data from NetShort
import { TheatersResponse, TheaterSection, DramaItem, ForYouResponse } from '@/src/types';

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
   * Returns array of sections like "Drama Viral", "Drama Premium", "Dubbing", etc.
   */
  getTheaters: (): Promise<TheatersResponse> => fetchApi('/theaters'),

  /**
   * Get drama recommendations for user (For You page)
   * @param page - Page number (default: 1)
   */
  getForYou: (page: number = 1): Promise<ForYouResponse> =>
    fetchApi(`/foryou?page=${page}`),

  /**
   * Get a specific section by content remark
   * @param contentRemark - e.g., 'premium_drama', 'dubbed', 'coming_soon', 'rankings'
   */
  getSectionByRemark: async (contentRemark: string): Promise<TheaterSection | undefined> => {
    const theaters = await fetchApi<TheatersResponse>('/theaters');
    return theaters.find(section => section.contentRemark === contentRemark);
  },

  /**
   * Get featured/hero drama (first item from first section with high heat score)
   */
  getHeroDrama: async (): Promise<DramaItem | undefined> => {
    const theaters = await fetchApi<TheatersResponse>('/theaters');
    // Get the first section (usually "Drama Viral")
    const firstSection = theaters[0];
    if (firstSection && firstSection.contentInfos.length > 0) {
      // Return the drama with highest heat score
      return firstSection.contentInfos.reduce((max, item) =>
        item.heatScore > max.heatScore ? item : max
      );
    }
    return undefined;
  },

  /**
   * Search dramas by name across all sections
   * @param query - Search query
   */
  searchDramas: async (query: string): Promise<DramaItem[]> => {
    const theaters = await fetchApi<TheatersResponse>('/theaters');
    const allDramas: DramaItem[] = [];
    const searchLower = query.toLowerCase();

    theaters.forEach(section => {
      section.contentInfos.forEach(drama => {
        if (
          drama.shortPlayName.toLowerCase().includes(searchLower) ||
          drama.labelArray.some(label => label.toLowerCase().includes(searchLower))
        ) {
          // Avoid duplicates
          if (!allDramas.find(d => d.shortPlayId === drama.shortPlayId)) {
            allDramas.push(drama);
          }
        }
      });
    });

    return allDramas;
  },
};

export default dramaApi;

