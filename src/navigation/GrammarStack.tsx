import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Menu } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import GrammarIndexScreen from '../screens/GrammarScreen/GrammarIndexScreen';
import GrammarDetailScreen from '../screens/GrammarScreen/GrammarDetailScreen';

const Stack = createNativeStackNavigator();

const GrammarStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#2563eb',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="GrammarIndex" 
        component={GrammarIndexScreen} 
        options={{ 
          title: 'Grammar',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 10 }}
            >
              <Menu color="#2563eb" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="GrammarDetail" 
        component={GrammarDetailScreen} 
        options={({ route }: any) => ({ title: route.params?.title || 'Lesson' })}
      />
    </Stack.Navigator>
  );
};

export default GrammarStack;
