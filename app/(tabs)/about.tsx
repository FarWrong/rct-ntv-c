import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Button } from '../components/button';
import React from 'react';
import { router } from 'expo-router';

import { Link } from 'expo-router';


export default function Page() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/fatcat.jpg')} style={{width: 190, height: 190}}/>
      <Button onPress={()=>{router.replace('/');}} title="Go Home"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



