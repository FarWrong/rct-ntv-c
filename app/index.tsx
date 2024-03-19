import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { Button } from './components/button';
import { router } from 'expo-router';
import { useApiContext } from '../api/ApiContext';
import { Stack } from 'expo-router'
import { useTheme } from './utility/ThemeContext';


// Determines where to redirect upon app load
export default function StartPage() {
  const { loggedIn } = useApiContext();
  return <Redirect href={(loggedIn ? "/home" : "/login")}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});