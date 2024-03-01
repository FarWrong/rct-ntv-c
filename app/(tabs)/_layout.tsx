
import React from 'react';
import { Tabs } from 'expo-router/tabs';
import {Stack} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../utility/ThemeContext';



export default () =>{
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home'
        } else {
          iconName = 'help'
        }

        if(!focused){
          iconName += "-outline"
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor:theme.colors.primary,
      tabBarInactiveTintColor: 'gray',
    })}
  > 
      <Tabs.Screen name="home"></Tabs.Screen>
      <Tabs.Screen name="about"></Tabs.Screen>
    </Tabs>
  );
}