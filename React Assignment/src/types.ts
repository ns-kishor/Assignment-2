export interface ShowImage {
  medium: string;
  original: string;
}

export interface ShowRating {
  average: number | null;
}

export interface ShowNetwork {
  id: number;
  name: string;
  country?: {
    name: string;
    code: string;
    timezone: string;
  };
}

export interface ShowWebChannel {
  id: number;
  name: string;
}

export interface ShowSchedule {
  time: string;
  days: string[];
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime?: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule?: ShowSchedule;
  rating: ShowRating;
  weight?: number;
  network?: ShowNetwork | null;
  webChannel?: ShowWebChannel | null;
  image: ShowImage | null;
  summary: string | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}

export type PageView = 'home' | 'movies';

export type SortOption = 'rating-desc' | 'rating-asc' | 'date-desc' | 'date-asc' | 'name-asc';
