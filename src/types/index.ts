export interface Movie {
  id: string;
  title: string;
  tags: string;
  imageUrl: string;
  badge?: string; // e.g., 'EKSKLUSIF', 'NEW', 'HOT', 'TOP'
  badgeColor?: 'primary' | 'red' | 'orange' | 'blue';
}

export interface SectionData {
  title: string;
  items: Movie[];
  layout: 'scroll' | 'grid';
  showViewAll?: boolean;
}