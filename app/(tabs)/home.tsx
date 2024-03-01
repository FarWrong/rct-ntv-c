import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React from 'react';
import { Link } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';

export default function Page() {
  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('../../assets/bidenblast.jpg')} style={{width: 190, height: 190}}/>
      <Button onPress={()=>{router.replace('/about');}} title="Go to About"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

