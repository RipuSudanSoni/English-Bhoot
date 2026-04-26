import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { navigationTree } from '../../lib/links';
import { ChevronDown, ChevronRight, Book } from 'lucide-react-native';

const SidebarContent = ({ navigation }: any) => {
  const grammarTopics = navigationTree.find(n => n.id === 'grammar')?.children || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Book color="#2563eb" size={24} />
        <Text style={styles.headerTitle}>Grammar Tree</Text>
      </View>

      {grammarTopics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.item}
          onPress={() => {
            navigation.navigate('GrammarStack', { 
              screen: 'GrammarDetail',
              params: {
                path: topic.path, 
                title: topic.label
              }
            });
            navigation.closeDrawer();
          }}
        >
          <Text style={styles.itemText}>{topic.label}</Text>
          <ChevronRight color="#94a3b8" size={16} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemText: {
    fontSize: 16,
    color: '#334155',
  },
});

export default SidebarContent;
