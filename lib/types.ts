export interface BaseItem {
  id: string;
  tmdbId: number; // <-- BU BO'LISHI SHART
  title: string;
  date: string;
  order: number;
  phase: string;
  tmdbType: 'movie' | 'tv';
  year: number;
}
