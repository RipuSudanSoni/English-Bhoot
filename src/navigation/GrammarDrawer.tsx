import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GrammarStack from './GrammarStack';
import SidebarContent from '../components/SidebarDrawer/SidebarContent';

const Drawer = createDrawerNavigator();

const GrammarDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidebarContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name="GrammarStack" component={GrammarStack} />
    </Drawer.Navigator>
  );
};

export default GrammarDrawer;
