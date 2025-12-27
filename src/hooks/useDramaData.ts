import { useState, useEffect, useCallback } from 'react';
import { dramaApi } from '@/src/api/dramaApi';
import {
  TheatersResponse,
  SectionData,
  HeroData,
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
 * Custom hook for fetching and transforming drama data from theaters API
 * Used for Home page
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
 */
function extractHeroData(theaters: TheatersResponse): HeroData | null {
  if (!theaters.length || !theaters[0].contentInfos.length) {
    return null;
  }

  const firstSection = theaters[0];
  const topDrama = firstSection.contentInfos.reduce((max, item) =>
    item.heatScore > max.heatScore ? item : max
  );

  const name = topDrama.shortPlayName;
  let title = name;
  let subtitle = '';

  const splitPatterns = [' Untuk ', ' Dan ', ' atau ', ' di '];
  for (const pattern of splitPatterns) {
    if (name.includes(pattern)) {
      const parts = name.split(pattern);
      title = parts[0];
      subtitle = pattern.trim() + ' ' + parts.slice(1).join(pattern);
      break;
    }
  }

  if (!subtitle && name.split(' ').length > 3) {
    const words = name.split(' ');
    title = words.slice(0, Math.ceil(words.length / 2)).join(' ');
    subtitle = words.slice(Math.ceil(words.length / 2)).join(' ');
  }

  const labels = topDrama.labelArray;
  let description = '';
  if (labels.length > 0) {
    description = `Sebuah kisah ${labels[0]?.toLowerCase() || 'epik'} yang penuh dengan ${labels[1]?.toLowerCase() || 'emosi'} dan ${labels[2]?.toLowerCase() || 'kejutan'}. Tonton sekarang dan rasakan pengalaman yang tak terlupakan!`;
  } else {
    description = `Drama populer dengan ${topDrama.heatScoreShow || 'ribuan'} penonton. Tonton sekarang dan temukan kisah yang memikat hati!`;
  }

  return {
    title,
    subtitle,
    description,
    bgImage: topDrama.highImage || topDrama.shortPlayCover || topDrama.groupShortPlayCover,
    badge: topDrama.scriptName === 'Baru' ? 'NEW' : 'HOT',
  };
}

export default useDramaData;
