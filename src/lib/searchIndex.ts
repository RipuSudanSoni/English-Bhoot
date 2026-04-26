import Fuse from 'fuse.js';

export interface SearchItem {
  title: string;
  slug: string;
  content: string;
  category: string;
}

const options = {
  keys: ['title', 'content'],
  threshold: 0.4,
  ignoreLocation: true,
  includeMatches: true,
};

export class SearchService {
  private fuse: Fuse<SearchItem> | null = null;

  init(data: SearchItem[]) {
    this.fuse = new Fuse(data, options);
  }

  search(query: string) {
    if (!this.fuse) return [];
    return this.fuse.search(query);
  }
}

export const searchService = new SearchService();
