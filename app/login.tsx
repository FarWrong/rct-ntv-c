import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createClient, Provider } from 'urql';

import { styles } from './utility/style'; 
import { ApiContext, useApiContext } from './../api/ApiContext';
import { Button } from './components/button';
import { defaultPageTheme } from './utility/style';
//import { TextInput } from 'react-native';
import { TextBox } from './components/textbox';


export default function LoginPage() {
  // User/Pass Variables
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');

  // Error Logic
  const [error, setError] = useState('');

  // API Logic
  const {loginUser} = useApiContext();

  return (
    <View style={defaultPageTheme().container}>
      <Image 
        source={require('./../assets/logo.png')}
        style={{width: 120, height: 120}}
      />
      <TextBox
        style= {{marginTop: 20}}
        placeholder='Username'
        value={username}
        onChangeText={setUser}
        autoCapitalize = 'none'
      />
      <TextBox
        placeholder='Password'
        value={password}
        onChangeText={setPass}
        secureTextEntry={true} // Hides password input
      />
      <Button 
        onPress={async () => await loginUser(username,password)}
        title="Log In"
        style = {styles.setupbutton}
      />
      <StatusBar style="auto"/>
    </View>
  );
}