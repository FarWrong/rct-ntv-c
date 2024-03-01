import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';

export default function Page() {
  const [bidenSize, setBidenSize] = useState(130);

  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>
      <Image source={require('../../assets/bidenblast.jpg')} style={{width: bidenSize, height: bidenSize}}/>
      <Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>
      <Text>babo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

