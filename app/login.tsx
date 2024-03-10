import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from './components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from './utility/style';
import { TextInput } from 'react-native';
import { useApiContext } from './../api/ApiContext';
import { ApiContext } from '../api/ApiContext';
import { TextBox } from './components/textbox';



export default function Page() {
  const [bidenSize, setBidenSize] = useState(130);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    // Here you would typically save the token to localStorage/sessionStorage and redirect the user
  const {loginUser} = useApiContext();
  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('./../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>
      <TextBox 
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        secure={false}
      />
      <TextBox 
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secure={true}
      />
      <Button onPress={async () => {await loginUser(username,password);}} title="Try Login"></Button>
      <Text>babo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

