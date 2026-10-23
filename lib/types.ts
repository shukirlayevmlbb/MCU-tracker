export type Status = 'watched' | 'skipped';

export interface Episode {
  num: number;
  title?: string;
}

export interface BaseItem {
  id: string;
  title: string;
  date: string;
  order: number;
  phase: string;
  tmdbType: 'movie' | 'tv';
  year: number;
}

export interface MovieItem extends BaseItem {
  type: 'movie';
  runtime?: number;
}

export interface SeriesItem extends BaseItem {
  type: 'series';
  episodes: Episode[];
}

export type Item = MovieItem | SeriesItem;

export interface ItemProgress {
  status?: Status;
  episodes?: Record<number, Status>;
}

export type ProgressMap = Record<string, ItemProgress>;
