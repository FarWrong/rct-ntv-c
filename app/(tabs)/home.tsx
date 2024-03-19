import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { createClient, Provider } from 'urql';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function HomePage() {
  // TODO: Obtain first name of account from API and display

  return (
    <View style={defaultPageTheme().container}>
      <Text>Welcome Back, *Add User*!</Text>
      <Image 
        source={require('../../assets/ricehat.jpg')}
        style={{width: 200, height: 200}}
      />
      <StatusBar style="auto"/>
    </View>
  );
}