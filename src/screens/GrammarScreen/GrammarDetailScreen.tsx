import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { loadMarkdown } from '../../utils/loadMarkdown';
import { allAssets } from '../../content/assets';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import AdBanner from '../../components/AdBanner/AdBanner';
import { navigationTree } from '../../lib/links';

const GrammarDetailScreen = ({ route, navigation }: any) => {
  const { path, title } = route.params;
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const grammarTopics = navigationTree.find(n => n.id === 'grammar')?.children || [];

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const assetModule = allAssets[path];
        if (assetModule) {
          const result = await loadMarkdown(assetModule); 
          if (result) {
            setContent(result.content);
          }
        } else {
          console.warn('No asset found for path:', path);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [path]);

  const renderTopicHeader = () => (
    <View style={styles.headerWrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.headerScrollContent}
      >
        {grammarTopics.map((topic) => {
          const isActive = topic.path === path;
          return (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicChip,
                isActive && styles.topicChipActive
              ]}
              onPress={() => {
                if (!isActive) {
                  navigation.navigate('GrammarDetail', { 
                    path: topic.path, 
                    title: topic.label 
                  });
                }
              }}
            >
              <Text style={[
                styles.topicChipText,
                isActive && styles.topicChipTextActive
              ]}>
                {topic.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {renderTopicHeader()}
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        {renderTopicHeader()}
        <View style={styles.centered}>
          <Text style={styles.errorText}>Content not found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderTopicHeader()}
      <MarkdownRenderer content={content} />
      <AdBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  topicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  topicChipActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  topicChipText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  topicChipTextActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default GrammarDetailScreen;
