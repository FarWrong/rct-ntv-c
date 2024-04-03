import React from 'react';
import { ThemeProvider } from './utility/ThemeContext';
import { View } from 'react-native';
import { useTheme } from './utility/ThemeContext';
import { Tabs } from 'expo-router/tabs';
import { useApiContext,ApiProvider } from '../api/ApiContext';
import { useNavigation } from 'expo-router';
import { router } from 'expo-router';
import { useEffect } from 'react';
import LoginPage from './login';

// Logic
export function RenderDevice() {
  const { theme } = useTheme();
  const { loggedIn,updateUserData,userData } = useApiContext();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await updateUserData();
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  return(
    <Stack screenOptions={{
      headerShown: false
    }}
   >
      {!loggedIn ? <Stack.Screen 
        name="login"// Only renders tabs if logged in
        options={{headerShown:false}}>
      </Stack.Screen> : !(userData?.firstLoggedin)
      ?
      <Stack.Screen 
        name="(tabs)"
        options={{headerShown:false}}>
      </Stack.Screen> :
      <Stack.Screen 
      name="submit_data"
      options={{headerShown:false}}>
    </Stack.Screen> 
    }
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