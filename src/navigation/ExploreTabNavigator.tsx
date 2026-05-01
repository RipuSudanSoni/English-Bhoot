import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/ExploreScreen/ExploreScreen';
import GrammarDetailScreen from '../screens/GrammarScreen/GrammarDetailScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

const ExploreTabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
      <Stack.Screen name="GrammarDetail" component={GrammarDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default ExploreTabNavigator;
