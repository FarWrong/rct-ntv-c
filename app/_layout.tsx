import React from 'react';
import { ThemeProvider } from './utility/ThemeContext';
import { View } from 'react-native';
import { useTheme } from './utility/ThemeContext';
import { Tabs } from 'expo-router/tabs';
import { useApiContext,ApiProvider } from '../api/ApiContext';
import { Redirect, router, Slot, Stack, useNavigation } from 'expo-router';

// Logic
export function RenderDevice() {
  const { theme } = useTheme();
  const { loggedIn } = useApiContext();
  
  return(
    <Stack>
      <Stack.Screen 
        name={(loggedIn ? "(tabs)" : "login")} // Only renders tabs if logged in
        options={{headerShown:false}}>
      </Stack.Screen>
    </Stack>
  )
}

// Renders page
export default function RootLayout() {
  return (
    <ThemeProvider>
      <ApiProvider>
        <RenderDevice/>
      </ApiProvider>
    </ThemeProvider>
  );
}