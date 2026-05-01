import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { navigationTree } from '../../lib/links';
import { ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ExploreScreen = () => {
  const navigation = useNavigation<any>();

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: item.color || '#2563eb' }]}
      onPress={() => {
        // In a real app, this would navigate to a category detail screen
        // For now, we'll navigate to GrammarDetail if it's grammar, otherwise placeholder
        if (item.id === 'grammar') {
          navigation.navigate('ExploreTab', { screen: 'GrammarDetail', params: { path: 'grammar/grammar', title: 'Grammar' } });
        }
      }}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color || '#2563eb'}15` }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <ChevronRight color="#94a3b8" size={20} />
      </View>
      <Text style={styles.cardTitle}>{item.label}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Topics</Text>
        <Text style={styles.headerSubtitle}>Choose a category to start learning</Text>
      </View>
      
      <FlatList
        data={navigationTree}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' },
  headerSubtitle: { fontSize: 16, color: '#64748b', marginTop: 4 },
  listContent: { padding: 15, paddingBottom: 100 },
  row: { justifyContent: 'space-between' },
  card: {
    backgroundColor: '#ffffff',
    width: width * 0.44,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 24 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  cardDescription: { fontSize: 12, color: '#64748b', lineHeight: 16 },
});

export default ExploreScreen;
