import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createClient, Provider } from 'urql';

import { ApiContext, useApiContext } from './../api/ApiContext';
import { Button } from './components/button';
import { TextBox } from './components/textbox';
import { ValidateForm, ValidateUser } from './utility/formValidation';
import { defaultPageTheme } from './utility/style';


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
        source={require('./../assets/ricehat.jpg')}
        style={{width: 200, height: 200}}
      />
      {error ? (<Text>{error}</Text>) : null}
      <TextBox 
        placeholder='Username'
        value={username}
        onChangeText={setUser}
        secure={false}
        validate={ValidateUser}
      />
      <TextBox 
        placeholder='Password'
        value={password}
        onChangeText={setPass}
        secure={true} // Hides password input
      />
      <Button 
        onPress={async () => {
          setError(ValidateForm(username,password));
          if (!error) await loginUser(username,password);
        }}
        title="Try Login"
      />
      <StatusBar style="auto"/>
    </View>
  );
}