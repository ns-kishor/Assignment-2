import { SearchResult, Show } from '../types';

const BASE_URL = 'https://api.tvmaze.com';

let cachedShows: Show[] | null = null;

export async function fetchAllShows(): Promise<Show[]> {
  if (cachedShows && cachedShows.length > 0) {
    return cachedShows;
  }

  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows (Status: ${response.status})`);
    }
    const data: Show[] = await response.json();
    cachedShows = data;
    return data;
  } catch (error) {
    console.error('Error fetching all shows:', error);
    // If cache existed previously, return it
    if (cachedShows) return cachedShows;
    throw error;
  }
}

export async function searchShows(query: string): Promise<Show[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return fetchAllShows();
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(trimmed)}`);
    if (!response.ok) {
      throw new Error(`Failed to search shows (Status: ${response.status})`);
    }
    const results: SearchResult[] = await response.json();
    return results.map((item) => item.show);
  } catch (error) {
    console.error(`Error searching shows for "${query}":`, error);
    throw error;
  }
}

/**
 * Strips HTML tags safely from TVMaze summaries while preserving paragraphs/spacing.
 */
export function sanitizeSummary(htmlString: string | null | undefined): string {
  if (!htmlString) return 'No description available for this title.';
  
  // Replace HTML break/paragraph tags with space/newlines
  const formatted = htmlString
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  return formatted || 'No description available for this title.';
}

/**
 * Formats a release date (e.g. "2013-06-24") to a clean year or readable date
 */
export function formatReleaseDate(premiered: string | null | undefined): string {
  if (!premiered) return 'TBA';
  try {
    const date = new Date(premiered);
    if (isNaN(date.getTime())) {
      // Just extract 4 digits if present
      const match = premiered.match(/\b\d{4}\b/);
      return match ? match[0] : premiered;
    }
    return date.getFullYear().toString();
  } catch {
    return premiered;
  }
}

/**
 * Formats rating to a clean single decimal (e.g. 8.5)
 */
export function formatRating(rating: number | null | undefined): string {
  if (rating === null || rating === undefined || rating === 0) {
    return 'N/A';
  }
  return rating.toFixed(1);
}
