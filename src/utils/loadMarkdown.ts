import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = fileContent.match(frontmatterRegex);

  if (match) {
    const frontmatterString = match[1];
    const content = fileContent.replace(frontmatterRegex, '');
    
    const data: any = {};
    const lines = frontmatterString.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        data[key] = value;
      }
    }
    return { data, content };
  }

  return { data: {}, content: fileContent };
}

export async function loadMarkdown(assetModule: any) {
  try {
    const asset = Asset.fromModule(assetModule);
    if (!asset.localUri) {
      await asset.downloadAsync();
    }
    
    const fileUri = asset.localUri || asset.uri;
    const content = await FileSystem.readAsStringAsync(fileUri);
    
    // Parse frontmatter manually to avoid 'Buffer' dependency from gray-matter
    let { data, content: body } = parseFrontmatter(content);
    
    // Hide HTML comments from UI without deleting them from source files
    body = body.replace(/<!--.*?-->/gs, '');
    
    return {
      meta: data,
      content: body,
    };
  } catch (error) {
    console.error('Error loading markdown:', error);
    return null;
  }
}
