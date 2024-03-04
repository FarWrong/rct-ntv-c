import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../utility/ThemeContext';

import { Redirect } from 'expo-router';
import { useApiContext } from '../../api/ApiContext';
import { router } from 'expo-router';
export default () =>{
  const { loggedIn } = useApiContext();
  
  if(!loggedIn){
    return <Redirect href="/login" />;
  }

  const { theme } = useTheme();
  return (
    
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // Icon List
        if (route.name === 'home') iconName = 'home';
        else if (route.name === 'about') iconName = 'help';
        else iconName = 'log-in';
        // If icon isn't selected
        if (!focused) iconName += "-outline"
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="login" />
    </Tabs>
  );
}