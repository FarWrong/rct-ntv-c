import { Slot } from 'expo-router';
import React from 'react';
import { ThemeProvider } from './utility/ThemeContext';
import { View } from 'react-native';
import { useTheme } from './utility/ThemeContext';
import { Tabs } from 'expo-router/tabs';
import {Stack} from 'expo-router'


export function RenderDevice() {
    const { theme } = useTheme();
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown:false}}></Stack.Screen>
        </Stack>
    )

}

export default function RootLayout() {
  return (
    <ThemeProvider >
        <RenderDevice></RenderDevice>
    </ThemeProvider>
  );
}