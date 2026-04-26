import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GraduationCap, MessageCircle, Search, ArrowRight, BookOpen } from 'lucide-react-native';
import AdBanner from '../../components/AdBanner/AdBanner';
import { useNavigation } from '@react-navigation/native';

import { navigationTree } from '../../lib/links';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  
  const exploreTopics = navigationTree.find(n => n.id === 'grammar')?.children || [];

  return (
    <ScrollView className="flex-1 bg-slate-50">
      {/* Hero Section */}
      <View className="bg-blue-600 px-6 pt-16 pb-12 rounded-b-[40px] shadow-xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-blue-100 text-lg font-medium">Hello, Learner! 👋</Text>
            <Text className="text-white text-3xl font-bold mt-1">EnglishBhoot</Text>
          </View>
          <View className="bg-white/20 p-3 rounded-full">
            <GraduationCap color="white" size={32} />
          </View>
        </View>
        <Text className="text-blue-50 text-base leading-6 opacity-90">
          Master English grammar and speaking with our comprehensive, offline-first lessons.
        </Text>
      </View>

      <View className="px-6 -mt-6">
        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-row items-center"
          onPress={() => navigation.navigate('Search')}
        >
          <View className="bg-sky-50 p-2 rounded-xl mr-3">
            <Search color="#0ea5e9" size={20} />
          </View>
          <Text className="text-slate-400 flex-1 text-base font-medium">What do you want to learn today?</Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 mt-6">
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity 
            className="flex-1 bg-indigo-50 p-4 rounded-2xl mr-2"
            onPress={() => navigation.navigate('GrammarTab')}
          >
            <View className="bg-indigo-100 w-10 h-10 rounded-full items-center justify-center mb-3">
              <BookOpen color="#4f46e5" size={20} />
            </View>
            <Text className="text-indigo-900 font-bold">Grammar</Text>
            <Text className="text-indigo-600/80 text-xs mt-1">Rules & syntax</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-emerald-50 p-4 rounded-2xl ml-2"
            onPress={() => navigation.navigate('SpeakingTab')}
          >
            <View className="bg-emerald-100 w-10 h-10 rounded-full items-center justify-center mb-3">
              <MessageCircle color="#10b981" size={20} />
            </View>
            <Text className="text-emerald-900 font-bold">Speaking</Text>
            <Text className="text-emerald-600/80 text-xs mt-1">Real scenarios</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="py-6">
        <Text className="text-slate-900 text-xl font-bold mb-4 px-6">Explore Topics</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {exploreTopics.map((topic, index) => {
            const fallbackColor = 'bg-blue-100 text-blue-600';
            const colorClass = topic.colorClass || fallbackColor;
            return (
              <TouchableOpacity 
                key={topic.id}
                className="bg-white p-5 rounded-3xl mr-4 shadow-sm border border-slate-100 items-center justify-center w-28"
                onPress={() => navigation.navigate('GrammarTab', {
                  screen: 'GrammarDetail',
                  params: { path: topic.path, title: topic.label }
                })}
              >
                <View className={`w-12 h-12 rounded-full items-center justify-center mb-3 ${colorClass.split(' ')[0]}`}>
                  <Text className={`font-bold text-lg ${colorClass.split(' ')[1]}`}>{topic.icon || 'B'}</Text>
                </View>
                <Text className="text-slate-800 font-semibold">{topic.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <AdBanner />

      <View className="px-6 pb-12">
        <View className="bg-slate-900 p-8 rounded-[32px]">
          <Text className="text-white text-2xl font-bold mb-2">Ready to Speak?</Text>
          <Text className="text-slate-400 mb-6 leading-6">
            Practice real-world conversations and improve your fluency today.
          </Text>
          <TouchableOpacity 
            className="bg-blue-600 py-4 px-8 rounded-2xl self-start"
            onPress={() => navigation.navigate('SpeakingTab')}
          >
            <Text className="text-white font-bold text-base">Start Practicing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
