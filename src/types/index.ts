// Types for NetShort API Response

// Individual drama/short play item
export interface DramaItem {
  id: string | null;
  shortPlayId: string;
  shortPlayLibraryId: string;
  shortPlayName: string;
  shortPlayLabels: string;
  labelArray: string[];
  isNewLabel: boolean;
  labelLanguageIds: string[];
  shortPlayCover: string;
  groupShortPlayCover: string;
  contentModel: number | null;
  isChase: boolean;
  script: number;
  scriptName: string | null;
  scriptType: number;
  heatScore: number;
  heatScoreShow: string | null;
  totalReserveNum: string;
  isReserve: number;
  publishTime: number;
  expGroup: string | null;
  expName: string | null;
  sceneId: string | null;
  highImage: string | null;
  isNeedHighImage: boolean;
  isForceShortPlay: boolean;
}

// Theater section/category
export interface TheaterSection {
  contentType: number;
  groupId: string;
  contentName: string;
  contentModel: number;
  contentInfos: DramaItem[];
  heatShowSwitch: number;
  freeEndTime: number;
  hiddenName: number;
  highShowCount: number | null;
  contentRemark: string;
}

// ForYou API Response (with pagination)
export interface ForYouResponse {
  contentType: number;
  groupId: string;
  contentName: string;
  contentModel: number;
  contentInfos: DramaItem[];
  maxOffset: number;
  heatShowSwitch: number;
  freeEndTime: number;
  freeConfigId: string | null;
  hiddenName: number;
  highShowCount: number;
  contentRemark: string;
  completed: boolean;
}

// API Response - array of theater sections
export type TheatersResponse = TheaterSection[];

// Legacy types for backward compatibility with existing components
export interface Movie {
  id: string;
  title: string;
  tags: string;
  imageUrl: string;
  badge?: string;
  badgeColor?: 'primary' | 'red' | 'orange' | 'blue';
  heatScore?: string;
}

export interface SectionData {
  title: string;
  items: Movie[];
  layout: 'scroll' | 'grid';
  showViewAll?: boolean;
}

// Hero data interface
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  badge: string;
}

// Utility function to transform API data to component format
export function transformDramaToMovie(drama: DramaItem): Movie {
  // Determine badge based on scriptName or isNewLabel
  let badge: string | undefined;
  let badgeColor: Movie['badgeColor'] | undefined;

  if (drama.scriptName === 'Baru' || drama.isNewLabel) {
    badge = 'NEW';
    badgeColor = 'red';
  } else if (drama.scriptName === 'Populer') {
    badge = 'HOT';
    badgeColor = 'orange';
  } else if (drama.heatScore && drama.heatScore > 1000000) {
    badge = 'TOP';
    badgeColor = 'primary';
  }

  return {
    id: drama.shortPlayId,
    title: drama.shortPlayName,
    tags: drama.labelArray.slice(0, 2).join(' | ') || 'Drama',
    imageUrl: drama.shortPlayCover || drama.groupShortPlayCover,
    badge,
    badgeColor,
    heatScore: drama.heatScoreShow || undefined,
  };
}

export function transformSectionToSectionData(
  section: TheaterSection,
  layout: 'scroll' | 'grid' = 'scroll'
): SectionData {
  return {
    title: section.contentName.replace(/[🔥👍🎤⏰]/g, '').trim(),
    items: section.contentInfos.map(transformDramaToMovie),
    layout,
    showViewAll: section.contentInfos.length > 5,
  };
}