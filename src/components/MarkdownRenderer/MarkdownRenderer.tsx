import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import Markdown, { RenderRules } from 'react-native-markdown-display';
import { Compass, X, Star } from 'lucide-react-native';

interface MarkdownRendererProps {
  content: string;
}

interface HeadingData {
  key: string;
  text: string;
  level: number;
  y: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(({ content }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const headingsRef = useRef<HeadingData[]>([]);

  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const lastContentRef = useRef(content);

  // Clear headings when content changes to prevent accumulation from previous topics
  // We do this during render to avoid race conditions with onLayout
  if (lastContentRef.current !== content) {
    headingsRef.current = [];
    lastContentRef.current = content;
    // Reset state only if it's not already empty to avoid infinite loops
    if (headings.length > 0) setHeadings([]);
  }

  const handleHeadingLayout = useCallback((key: string, text: string, level: number, y: number) => {
    // We only add headings that were explicitly marked with [nav]
    const existingIndex = headingsRef.current.findIndex(h => h.key === key);
    const newHeading = { key, text, level, y };

    if (existingIndex >= 0) {
      headingsRef.current[existingIndex] = newHeading;
    } else {
      headingsRef.current.push(newHeading);
    }
  }, []);

  const openNavigation = useCallback(() => {
    const sorted = [...headingsRef.current].sort((a, b) => a.y - b.y);
    setHeadings(sorted);
    setModalVisible(true);
  }, []);

  const scrollToHeading = useCallback((y: number) => {
    setModalVisible(false);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 20), animated: true });
    }, 100);
  }, []);

  const rules = useMemo<RenderRules>(() => {
    const navRegex = /\[nav(?::\s*(.*?))?\]/;

    const extractText = (n: any): string => {
      if (!n) return '';
      let t = '';
      if (n.content) t += n.content;
      if (n.children && Array.isArray(n.children)) {
        t += n.children.map(extractText).join('');
      }
      return t;
    };

    const createHeadingRule = (level: number, style: any) => (node: any, children: any, parent: any, styles: any) => {
      const originalText = extractText(node);
      const match = originalText.match(navRegex);

      // Only process headings that have the [nav] or [nav: title] tag
      if (!match) {
        return (
          <View key={node.key}>
            <Text style={[styles[style]]}>{children}</Text>
          </View>
        );
      }

      // If [nav: Short Title] is used, use that for the menu. 
      // Otherwise, use the original text minus the [nav] tag and {#id} tag.
      const navTitle = (match[1] || originalText.replace(navRegex, '').replace(/\{#.*?\}/g, '').trim());

      return (
        <View
          key={node.key}
          onLayout={(e) => handleHeadingLayout(node.key, navTitle, level, e.nativeEvent.layout.y)}
        >
          <Text style={[styles[style]]}>{children}</Text>
        </View>
      );
    };

    return {
      heading1: createHeadingRule(1, 'heading1'),
      heading2: createHeadingRule(2, 'heading2'),
      heading3: createHeadingRule(3, 'heading3'),
      heading4: createHeadingRule(4, 'heading4'),
      heading5: createHeadingRule(5, 'heading5'),
      heading6: createHeadingRule(6, 'heading6'),
      text: (node, children, parent, styles) => {
        // Hide [nav] tags and {#id} tags from the rendered content on the page
        const cleanText = node.content
          .replace(navRegex, '')
          .replace(/\{#.*?\}/g, '')
          .trim();
        
        if (!cleanText && (node.content.includes('[nav') || node.content.includes('{#'))) {
          return null;
        }
        
        // We MUST provide a key to avoid "unique key prop" warnings
        return (
          <Text key={node.key} style={styles.text}>
            {cleanText || node.content.replace(navRegex, '').replace(/\{#.*?\}/g, '')}
          </Text>
        );
      },
      image: (node, children, parent, styles) => {
        // Fix the "key spread" warning by explicitly passing the key
        const { key, ...attributes } = node.attributes;
        return (
          <Image
            key={node.key}
            {...attributes}
            style={styles.image || { width: '100%', height: 200, resizeMode: 'contain' }}
          />
        );
      },
    };
  }, [handleHeadingLayout]);

  return (
    <View style={styles.wrapper}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
        <Markdown style={markdownStyles} rules={rules}>
          {content}
        </Markdown>
      </ScrollView>

      {/* Subtopics FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={openNavigation}
        activeOpacity={0.8}
      >
        <Compass color="#ffffffff" size={24} />
        <Text style={styles.fabText}>Subtopics</Text>
      </TouchableOpacity>

      {/* Bottom Sheet Modal for Navigation */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Subtopics</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="#64748b" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.headingsList} contentContainerStyle={styles.headingsListContent}>
              {headings.length === 0 ? (
                <Text style={styles.emptyText}>No headings found in this topic.</Text>
              ) : (
                headings.map((heading) => (
                  <TouchableOpacity
                    key={heading.key}
                    style={styles.headingItem}
                    onPress={() => scrollToHeading(heading.y)}
                  >
                    <View style={styles.headingItemContent}>
                      <Star size={14} color="#2563eb" fill="#2563eb" style={styles.headingIcon} />
                      <Text
                        style={[
                          styles.headingItemText,
                          heading.level === 1 && styles.headingItemTextBold
                        ]}
                        numberOfLines={2}
                      >
                        {heading.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal >
    </View >
  );
});

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
  },
  heading1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 16,
    marginTop: 24,
    lineHeight: 34,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d4ed8',
    marginBottom: 14,
    marginTop: 20,
    lineHeight: 28,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 10,
    marginTop: 16,
  },
  paragraph: {
    marginBottom: 16,
  },
  list_item: {
    marginBottom: 8,
  },
  code_inline: {
    backgroundColor: '#f1f5f9',
    color: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  fence: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    paddingLeft: 12,
    marginVertical: 16,
    backgroundColor: '#eff6ff',
    paddingVertical: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginVertical: 16,
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: 12,
    fontWeight: '700',
    color: '#1e293b',
  },
  td: {
    padding: 12,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 100, // extra padding for FAB
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.7,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headingsList: {
    paddingHorizontal: 20,
  },
  headingsListContent: {
    paddingVertical: 12,
  },
  headingItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingIcon: {
    marginRight: 10,
    opacity: 0.8,
  },
  headingItemText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
  },
  headingItemTextBold: {
    fontWeight: '700',
    color: '#1e3a8a',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default MarkdownRenderer;
