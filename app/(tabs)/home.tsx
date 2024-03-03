import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { createClient, Provider } from 'urql';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function Page() {
  const [bidenSize, setBidenSize] = useState(130);

  return (
    <View style={defaultPageTheme().container}>
      <Image
        source={require('../../assets/bidenblast.jpg')}
        style={{ width: bidenSize, height: bidenSize }}
      />
      <Button
        onPress={() => { setBidenSize(bidenSize + 1); }}
        title="Go to About"
      />
      <Text>UNKSKADUNKSAUNSKADUNSKAUNKSADUNSKA</Text>
      <StatusBar style="auto" />
    </View>
  );
}