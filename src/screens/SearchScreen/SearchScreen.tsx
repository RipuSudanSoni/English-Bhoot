import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Search as SearchIcon, ChevronRight } from 'lucide-react-native';
import { searchService } from '../../lib/searchIndex';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 1) {
      const searchResults = searchService.search(text);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchIcon color="#64748b" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search grammar lessons..."
          value={query}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.item.slug}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              onPress={() => navigation.navigate('GrammarTab', {
                screen: 'GrammarDetail',
                params: { path: item.item.slug, title: item.item.title }
              })}
            >
              <View>
                <Text style={styles.resultTitle}>{item.item.title}</Text>
                <Text style={styles.resultCategory}>{item.item.category}</Text>
              </View>
              <ChevronRight color="#94a3b8" size={20} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <SearchIcon color="#e2e8f0" size={64} strokeWidth={1} />
          <Text style={styles.placeholderText}>
            {query.length > 0 ? 'No results found' : 'Type at least 2 characters to search'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1e293b',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  resultCategory: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  placeholderText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SearchScreen;
