import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Moon, Shield, Info, Share2, Star, Mail } from 'lucide-react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const SettingItem = ({ icon: Icon, label, value, type = 'arrow', onPress }: any) => (
    <TouchableOpacity 
      className="flex-row items-center justify-between p-4 bg-white border-b border-slate-50"
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center mr-4">
          <Icon color="#64748b" size={20} />
        </View>
        <Text className="text-slate-700 text-base font-medium">{label}</Text>
      </View>
      {type === 'switch' ? (
        <Switch 
          value={value} 
          onValueChange={onPress}
          trackColor={{ false: '#e2e8f0', true: '#93c5fd' }}
          thumbColor={value ? '#2563eb' : '#f8fafc'}
        />
      ) : type === 'text' ? (
        <Text className="text-slate-400 text-sm">{value}</Text>
      ) : (
        <View className="text-slate-300">
           <Info size={20} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="px-6 pt-16 pb-8 bg-white border-b border-slate-100">
        <Text className="text-slate-900 text-3xl font-bold">Settings</Text>
        <Text className="text-slate-500 mt-2">Manage your app experience</Text>
      </View>

      <View className="mt-8">
        <Text className="px-6 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Preference</Text>
        <View className="bg-white border-y border-slate-100">
          <SettingItem 
            icon={Moon} 
            label="Dark Mode" 
            type="switch" 
            value={isDarkMode} 
            onPress={() => setIsDarkMode(!isDarkMode)} 
          />
        </View>
      </View>

      <View className="mt-8">
        <Text className="px-6 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Support</Text>
        <View className="bg-white border-y border-slate-100">
          <SettingItem icon={Star} label="Rate EnglishBhoot" />
          <SettingItem icon={Share2} label="Share with Friends" />
          <SettingItem icon={Mail} label="Contact Support" />
        </View>
      </View>

      <View className="mt-8">
        <Text className="px-6 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">About</Text>
        <View className="bg-white border-y border-slate-100">
          <SettingItem icon={Shield} label="Privacy Policy" />
          <SettingItem icon={Info} label="App Version" type="text" value="v1.0.0" />
        </View>
      </View>

      <View className="p-8 items-center">
        <Text className="text-slate-300 text-sm font-medium">Made with ❤️ for English Learners</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
