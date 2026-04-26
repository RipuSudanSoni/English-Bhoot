import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { navigationTree } from '../../lib/links';
import { ChevronRight, Bookmark } from 'lucide-react-native';

const GrammarIndexScreen = ({ navigation }: any) => {
  const [activeSuperTopic, setActiveSuperTopic] = useState(navigationTree[0]?.id);

  const activeCategory = navigationTree.find(n => n.id === activeSuperTopic);
  const subtopics = activeCategory?.children || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Important Topics</Text>
        <Text style={styles.headerSubtitle}>Explore categories to master English</Text>
      </View>

      <View style={styles.superTopicWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.superTopicScroll}>
          {navigationTree.map((topic) => {
            const isActive = topic.id === activeSuperTopic;
            return (
              <TouchableOpacity
                key={topic.id}
                style={[styles.superTopicChip, isActive && styles.superTopicChipActive]}
                onPress={() => setActiveSuperTopic(topic.id)}
              >
                <Text style={[styles.superTopicText, isActive && styles.superTopicTextActive]}>
                  {topic.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      <FlatList
        data={subtopics}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.topicCard}
            onPress={() => navigation.navigate('GrammarDetail', { 
              path: item.path, 
              title: item.label 
            })}
          >
            <View style={styles.topicCardLeft}>
              <View style={styles.topicIcon}>
                <Bookmark color="#2563eb" size={20} />
              </View>
              <Text style={styles.topicTitle}>{item.label}</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 16, backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#0f172a' },
  headerSubtitle: { color: '#64748b', marginTop: 4, fontSize: 16 },
  superTopicWrapper: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  superTopicScroll: { paddingHorizontal: 20, paddingVertical: 12 },
  superTopicChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f1f5f9', marginRight: 12 },
  superTopicChipActive: { backgroundColor: '#2563eb' },
  superTopicText: { fontSize: 14, color: '#64748b', fontWeight: '500' },
  superTopicTextActive: { color: '#ffffff', fontWeight: 'bold' },
  topicCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#ffffff', borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  topicCardLeft: { flexDirection: 'row', alignItems: 'center' },
  topicIcon: { backgroundColor: '#eff6ff', padding: 10, borderRadius: 12, marginRight: 16 },
  topicTitle: { fontSize: 18, color: '#1e293b', fontWeight: '600' }
});

export default GrammarIndexScreen;
