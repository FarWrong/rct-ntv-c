import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Button } from '../components/button';
import React from 'react';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';

import { Link } from 'expo-router';


export default function Page() {
  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('../../assets/fatcat.jpg')} style={{width: 190, height: 190}}/>
      <Button onPress={()=>{router.replace('/');}} title="Go Home"></Button>
      <StatusBar style="auto" />
    </View>
  );
}


