import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Compass, Bookmark, User, GraduationCap } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LearnPathScreen from '../screens/LearnScreen/LearnPathScreen';
import ExploreTabNavigator from './ExploreTabNavigator';
import SavedScreen from '../screens/SavedScreen/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerShown: false,
        tabBarStyle: { paddingBottom: 8, height: 65, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', backgroundColor: '#ffffff', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color }) => <Home color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="LearnTab" 
        component={LearnPathScreen}
        options={{ 
          title: 'Learn', 
          tabBarIcon: ({ color }) => <GraduationCap color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="ExploreTab" 
        component={ExploreTabNavigator}
        options={{ 
          title: 'Explore', 
          tabBarIcon: ({ color }) => <Compass color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="SavedTab" 
        component={SavedScreen}
        options={{ 
          title: 'Saved', 
          tabBarIcon: ({ color }) => <Bookmark color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({ color }) => <User color={color} size={24} /> 
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
