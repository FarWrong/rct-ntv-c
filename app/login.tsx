import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createClient, Provider } from 'urql';

import { ApiContext, useApiContext } from './../api/ApiContext';
import { Button } from './components/button';
import { defaultPageTheme } from './utility/style';
import { TextInput } from 'react-native';
import { TextBox } from './components/textbox';

/*
// Manages API
  const {loginUser} = useApiContext();
  const loginAPI = async (user, pass) => { await loginUser(user,pass); }

// Form Validation
const [error, setError] = useState('');
const showFormError = (error, showError) => {
  showError(error);
  setTimeout(() => {showError('')}, 1000);
}

const validateForm = (user, pass) => {
  if (user.length < 3) return showFormError('Username is too short!', setError);
  else return 0;
}
*/


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
      <TextInput
        style= {[styles.input, {marginTop: 50}]}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        autoCapitalize = 'none'
      />
      <TextInput
      style = {styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPass}
        secure={true} // Hides password input
        onChangeText={setPassword}
        secureTextEntry = {true}
      />
      <Button 
        onPress={async () => {await loginUser(username,password);}}
        title="Log In"
        style = {styles.setupbutton}
      />
      <StatusBar style="auto"/>
    </View>
  );
}