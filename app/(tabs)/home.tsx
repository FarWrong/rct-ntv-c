import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { createClient, Provider } from 'urql';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';
import { TextInput } from 'react-native';



export default function Page() {
  const [bidenSize, setBidenSize] = useState(130);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    // Here you would typically save the token to localStorage/sessionStorage and redirect the user

  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>
      <Text>babo</Text>
      <StatusBar style="auto" />
    </View>
  );
}