import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpeakingIndexScreen from '../screens/StartSpeakingScreen/SpeakingIndexScreen';

// In the future, we'll add SpeakingDetailScreen here
const Stack = createNativeStackNavigator();

const SpeakingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#2563eb',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="SpeakingIndex" 
        component={SpeakingIndexScreen} 
        options={{ title: 'Start Speaking' }}
      />
    </Stack.Navigator>
  );
};

export default SpeakingStack;
