import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MessageCircle, Mic, Play, ArrowRight } from 'lucide-react-native';

const SpeakingIndexScreen = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="px-6 pt-12 pb-6 bg-white border-b border-slate-100">
        <Text className="text-slate-900 text-3xl font-bold">Speaking</Text>
        <Text className="text-slate-500 mt-2">Improve your fluency and confidence</Text>
      </View>

      <View className="p-6">
        <View className="bg-amber-500 p-8 rounded-[32px] mb-8 shadow-lg shadow-amber-200">
          <View className="bg-white/20 w-16 h-16 rounded-2xl items-center justify-center mb-4">
            <Mic color="white" size={32} />
          </View>
          <Text className="text-white text-2xl font-bold mb-2">Speak Like a Native</Text>
          <Text className="text-amber-50 mb-6 leading-6 opacity-90">
            Practice pronunciation and common phrases with our interactive guides.
          </Text>
          <TouchableOpacity className="bg-white py-4 px-8 rounded-2xl self-start shadow-sm">
            <Text className="text-amber-600 font-bold text-base">Coming Soon</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-slate-900 text-xl font-bold mb-4">Speaking Modules</Text>
        
        <TouchableOpacity className="bg-white p-5 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm border border-slate-100 opacity-60">
          <View className="flex-row items-center">
            <View className="bg-blue-50 p-3 rounded-xl mr-4">
              <Play color="#2563eb" size={20} />
            </View>
            <View>
              <Text className="text-slate-800 font-semibold text-lg">Daily Conversations</Text>
              <Text className="text-slate-500 text-sm">Greetings & Introduction</Text>
            </View>
          </View>
          <ArrowRight color="#94a3b8" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-5 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm border border-slate-100 opacity-60">
          <View className="flex-row items-center">
            <View className="bg-green-50 p-3 rounded-xl mr-4">
              <MessageCircle color="#10b981" size={20} />
            </View>
            <View>
              <Text className="text-slate-800 font-semibold text-lg">Workplace English</Text>
              <Text className="text-slate-500 text-sm">Meetings & Emails</Text>
            </View>
          </View>
          <ArrowRight color="#94a3b8" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SpeakingIndexScreen;
