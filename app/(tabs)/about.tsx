import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function Page() {
  return (
    <View style={defaultPageTheme().container}>
      <Image
        source={require('../../assets/fatcat.jpg')}
        style={{ width: 190, height: 190 }}
      />
      <Button
        onPress={() => { router.replace('/'); }}
        title="Go Home"
      />
      <StatusBar style="auto" />
    </View>
  );
}