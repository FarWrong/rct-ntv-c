import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createClient, Provider } from 'urql';

import { ApiContext, useApiContext } from './../api/ApiContext';
import { Button } from './components/button';
import { TextBox } from './components/textbox';
import { defaultPageTheme } from './utility/style';
import { FormValidation } from './utility/formValidation';

var userRegex:RegExp = new RegExp('^\w{3-32}$');
var passRegex:RegExp = new RegExp('^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,32}$');

export default function LoginPage() {
  // User/Pass Variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Form validation
  const [validUser, setValidUser] = useState(true); // Life Hack: Error text only
  const [validPass, setValidPass] = useState(true); // appears on user input
  const isValidForm = () => {
    (validUser && validPass) ? true : false;
  }
  // Here you would typically save the token to localStorage/sessionStorage and redirect the user
  const {loginUser} = useApiContext();

  return (
    <View style={defaultPageTheme().container}>
      <Image 
        source={require('./../assets/ricehat.jpg')}
        style={{width: 200, height: 200}}
      />
      <Text style={{}}>{}</Text>
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
        secure={true} // Hides password input
      />
      <TextBox 
        placeholder='NumberTest'
        field='number-pad'
      />
      <Button 
        onPress={async () => {/*if (isValidForm())*/ await loginUser(username,password);}}
        title="Try Login"
      />
      <StatusBar style="auto"/>
    </View>
  );
}