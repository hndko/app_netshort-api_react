import { useState, useEffect, useCallback } from 'react';
import { dramaApi } from '@/src/api/dramaApi';
import {
  TheatersResponse,
  SectionData,
  HeroData,
  DramaItem,
  transformDramaToMovie,
  transformSectionToSectionData
} from '@/src/types';

interface UseDramaDataState {
  sections: SectionData[];
  heroData: HeroData | null;
  loading: boolean;
  error: Error | null;
}

interface UseDramaDataReturn extends UseDramaDataState {
  refetch: () => void;
}

/**
 * Custom hook for fetching and transforming drama data from API
 */
export function useDramaData(): UseDramaDataReturn {
  const [state, setState] = useState<UseDramaDataState>({
    sections: [],
    heroData: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const theaters = await dramaApi.getTheaters();

      // Transform theater sections to component format
      const sections = transformTheatersToSections(theaters);

      // Get hero data from first section's top item
      const heroData = extractHeroData(theaters);

      setState({
        sections,
        heroData,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        sections: [],
        heroData: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch drama data')
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

/**
 * Transform API theaters response to SectionData array for components
 */
function transformTheatersToSections(theaters: TheatersResponse): SectionData[] {
  // Map content remarks to layouts
  const layoutMap: Record<string, 'scroll' | 'grid'> = {
    'premium_drama': 'scroll',
    'top_short_dramas': 'scroll',
    'dubbed': 'scroll',
    'coming_soon': 'scroll',
    'rankings': 'grid',
  };

  return theaters.map(section => {
    const layout = layoutMap[section.contentRemark] || 'grid';
    return transformSectionToSectionData(section, layout);
  });
}

/**
 * Extract hero data from theaters response
 * Uses the drama with highest heat score from first section
 */
function extractHeroData(theaters: TheatersResponse): HeroData | null {
  if (!theaters.length || !theaters[0].contentInfos.length) {
    return null;
  }

  // Find the drama with highest heat score across first section
  const firstSection = theaters[0];
  const topDrama = firstSection.contentInfos.reduce((max, item) =>
    item.heatScore > max.heatScore ? item : max
  );

  // Extract title parts (some titles have format "Title Subtitle")
  const titleParts = topDrama.shortPlayName.split(' ').slice(0, 3).join(' ');
  const subtitleParts = topDrama.shortPlayName.split(' ').slice(3).join(' ') ||
    topDrama.labelArray[0] || '';

  return {
    title: titleParts,
    subtitle: subtitleParts,
    description: `${topDrama.labelArray.join(' · ')} - ${topDrama.heatScoreShow || ''} penonton`,
    bgImage: topDrama.highImage || topDrama.shortPlayCover || topDrama.groupShortPlayCover,
    badge: topDrama.scriptName === 'Baru' ? 'NEW' : 'HOT',
  };
}

export default useDramaData;
