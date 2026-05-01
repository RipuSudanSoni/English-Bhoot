import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LearnPathScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Learning Path</Text>
      <Text style={styles.subtitle}>Phase 2 will implement the structured path here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 16, color: '#64748b', marginTop: 10 },
});

export default LearnPathScreen;
