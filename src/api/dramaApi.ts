// API Service for fetching drama data
// Base URL is configured in .env file as VITE_API_BASE_URL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Drama API Functions
// TODO: Update endpoints once API documentation is provided
export const dramaApi = {
  // Get all dramas
  getDramas: () => fetchApi('/dramas'),

  // Get drama by ID
  getDramaById: (id: string) => fetchApi(`/dramas/${id}`),

  // Get dramas by category/section
  getDramasBySection: (section: string) => fetchApi(`/dramas/section/${section}`),

  // Get hero/featured drama
  getHeroDrama: () => fetchApi('/dramas/featured'),

  // Search dramas
  searchDramas: (query: string) => fetchApi(`/dramas/search?q=${encodeURIComponent(query)}`),
};

export default dramaApi;
