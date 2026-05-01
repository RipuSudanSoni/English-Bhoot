import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Search, Bell, Menu, ArrowRight, GraduationCap } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [progress, setProgress] = useState(65);
  const [userLevel, setUserLevel] = useState('Beginner');

  const quickActions = [
    { id: 'speak', label: 'Speak', icon: '🗣️', color: '#f59e0b', screen: 'ExploreTab', params: { category: 'start-speaking' } },
    { id: 'grammar', label: 'Grammar', icon: '📖', color: '#3b82f6', screen: 'ExploreTab', params: { category: 'grammar' } },
    { id: 'daily', label: 'Daily', icon: '📅', color: '#10b981', screen: 'ExploreTab', params: { category: 'daily-english' } },
    { id: 'quiz', label: 'Quiz', icon: '🎯', color: '#8b5cf6', screen: 'LearnTab' },
  ];

  const recommendations = [
    { id: 1, title: 'Use of May & Can', time: '5 min', level: 'Beginner', icon: '📘', path: 'grammar/grammar' }, // Paths updated to work with existing assets
    { id: 2, title: 'Noun Basics', time: '8 min', level: 'Beginner', icon: '💬', path: 'grammar/noun' },
    { id: 3, title: 'Present Tense', time: '10 min', level: 'Intermediate', icon: '👔', path: 'grammar/tense' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.logo}>EnglishBhoot</Text>
        <TouchableOpacity>
          <Bell color="#1e293b" size={24} />
        </TouchableOpacity>
      </View>

      {/* Welcome & Level */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.welcomeText}>👋 Hello, Learner!</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{userLevel}</Text>
          </View>
        </View>
        <View style={styles.headerIcon}>
           <GraduationCap color="#2563eb" size={40} />
        </View>
      </View>

      {/* Search Bar - MOST IMPORTANT */}
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={() => navigation.navigate('ExploreTab', { screen: 'Search' })}
      >
        <Search color="#94a3b8" size={20} style={{ marginRight: 12 }} />
        <Text style={styles.searchPlaceholder}>Search any topic...</Text>
      </TouchableOpacity>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>🎯 Your Learning Path</Text>
          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue: Tenses - Present <ArrowRight size={14} color="#2563eb" /></Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions - 4 buttons */}
      <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map(action => (
          <TouchableOpacity 
            key={action.id}
            style={[styles.quickActionCard, { backgroundColor: `${action.color}15` }]}
            onPress={() => navigation.navigate(action.screen, action.params)}
          >
            <Text style={{ fontSize: 28 }}>{action.icon}</Text>
            <Text style={[styles.quickActionLabel, { color: action.color }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended For You */}
      <Text style={styles.sectionTitle}>🔥 Recommended For You</Text>
      {recommendations.map(item => (
        <TouchableOpacity 
          key={item.id}
          style={styles.recommendCard}
          onPress={() => navigation.navigate('ExploreTab', {
            screen: 'GrammarDetail', // Using existing screen for now
            params: { path: item.path, title: item.title }
          })}
        >
          <View style={styles.recommendLeft}>
            <Text style={{ fontSize: 32, marginRight: 16 }}>{item.icon}</Text>
            <View>
              <Text style={styles.recommendTitle}>{item.title}</Text>
              <View style={styles.recommendMeta}>
                <Text style={styles.metaText}>⏱️ {item.time}</Text>
                <Text style={[styles.metaText, { color: item.level === 'Beginner' ? '#10b981' : '#f59e0b' }]}>
                  {item.level === 'Beginner' ? '🔰 Beginner' : '📌 Intermediate'}
                </Text>
              </View>
            </View>
          </View>
          <ArrowRight size={20} color="#94a3b8" />
        </TouchableOpacity>
      ))}

      {/* Popular Tags */}
      <Text style={styles.sectionTitle}>📚 Popular This Week</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsContainer}>
        {['Tenses', 'Modal Verbs', 'Daily Sentences', 'Interview Q&A', 'Vocabulary', 'Phrasal Verbs'].map(tag => (
          <TouchableOpacity key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, backgroundColor: '#ffffff' },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#2563eb' },
  welcomeSection: { paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  headerIcon: { backgroundColor: '#eff6ff', p: 10, borderRadius: 20 },
  levelBadge: { backgroundColor: '#e0e7ff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginTop: 8 },
  levelText: { color: '#4f46e5', fontWeight: '600', fontSize: 12 },
  searchBar: { backgroundColor: 'white', marginHorizontal: 20, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, marginVertical: 20 },
  searchPlaceholder: { color: '#94a3b8', fontSize: 16 },
  progressCard: { backgroundColor: 'white', marginHorizontal: 20, padding: 20, borderRadius: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  progressPercent: { fontSize: 16, fontWeight: 'bold', color: '#2563eb' },
  progressBar: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  progressFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 4 },
  continueButton: { paddingVertical: 8 },
  continueText: { color: '#2563eb', fontWeight: '600', alignItems: 'center', display: 'flex' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginHorizontal: 20, marginBottom: 16, marginTop: 8 },
  quickActionsGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 24 },
  quickActionCard: { width: width * 0.2, paddingVertical: 16, borderRadius: 20, alignItems: 'center', gap: 8 },
  quickActionLabel: { fontWeight: '600', fontSize: 13 },
  recommendCard: { backgroundColor: 'white', marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  recommendLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  recommendTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 6 },
  recommendMeta: { flexDirection: 'row', gap: 12 },
  metaText: { fontSize: 12, color: '#64748b' },
  tagsContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  tag: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderOneWidth: 1, borderColor: '#e2e8f0', marginRight: 10 },
  tagText: { color: '#475569', fontSize: 14, fontWeight: '500' },
});

export default HomeScreen;
