import { allAssets } from '../content/assets';
import { loadMarkdown } from '../utils/loadMarkdown';
import { searchService, SearchItem } from './searchIndex';

export async function buildSearchIndex() {
  const searchData: SearchItem[] = [];

  for (const [slug, assetModule] of Object.entries(allAssets)) {
    const result = await loadMarkdown(assetModule);
    if (result) {
      searchData.push({
        title: result.meta.title || slug.split('/').pop() || '',
        slug: slug,
        content: result.content,
        category: slug.split('/')[0],
      });
    }
  }

  searchService.init(searchData);
  console.log('Search index built with', searchData.length, 'items');
}
