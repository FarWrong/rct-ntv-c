import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, Stack, useRootNavigationState } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import React, { useEffect } from 'react';

import { useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';


export default () => {
  const { loggedIn,userData } = useApiContext();

  
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // Icon List
        //sss
        if (route.name === 'shop') iconName = 'bag';
        else if (route.name === 'plans') iconName = 'newspaper';
        else if (route.name === 'workout') iconName = 'barbell';
        else if (route.name === 'friends') iconName = 'people';
        else if (route.name === 'account') iconName = 'person';
        else iconName = 'help';
        // If icon isn't selected
        if (!focused) iconName += "-outline"
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: 'gray'
    })}>

      { /*Order of tabs*/ }
      <Tabs.Screen name="home" options={{title: "Home", headerShown:false, href: null}}></Tabs.Screen>
      <Tabs.Screen name="shop" options={{title: "Shop", headerShown:false}}/> 
      <Tabs.Screen name="plans" options={{title: "Plans", headerShown:false}}/>
      <Tabs.Screen name="workout" options={{title: "Workout", headerShown:false}}/>
      <Tabs.Screen name="friends" options={{title: "Friends", headerShown:false}}/>
      <Tabs.Screen name="account" options={{title: "Account", headerShown:false}}/>
    </Tabs>
  );
}