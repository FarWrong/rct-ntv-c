import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity , TextInput} from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from './components/button';
import { router } from 'expo-router';
import { defaultPageTheme , styles} from './utility/style';
import { useApiContext } from './../api/ApiContext';
import { setUserInfo } from './../api/User';
import { TextBox } from './components/textbox';
import { UserType } from './../api/User';


export default function Page() {
  const {authToken,updateUserData} = useApiContext();
  const [userData, setUserData] = useState<UserType>({});

  return (
    <View style={defaultPageTheme().container}>
      {/*<Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>*/}
      <Image source={require('./../assets/logo.png')} 
      style={{width: 120, height: 120}}/> 
      <Text style = {[styles.headerText, {fontSize: 20}]}>
        Your account is not registered with FitHub
      </Text>
      <Text style = {[styles.headerText, {fontSize: 15, fontWeight: 'normal', marginTop: 5}]}>
        Please import from Apple Health or fill out the following information:
      </Text>
      
  

<TextInput
  style = {[styles.input, {marginTop: 50}]}
  placeholder="First Name"
  value={userData.first_name?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, first_name: text })}
 
/>

<TextInput
  style = {styles.input}
  placeholder="Last Name"
  value={userData.last_name?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, last_name: text })}
  
/>

<TextInput
  style = {styles.input}
  placeholder="Gender"
  value={userData.gender?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, gender: text })}
  
/>

<TextInput
  style = {styles.input}
  placeholder="Weight"
  value={userData.weight?.toString() || ''}
  onChangeText={(text) => {
    const weight = parseInt(text, 10);
    if (!isNaN(weight)) {
      setUserData({ ...userData, weight });
    }
  }}
  
/>

<TextInput
  style = {styles.input}
  placeholder="Height"
  value={userData.height?.toString() || ''}
  onChangeText={(text) => {
    const height = parseInt(text, 10);
    if (!isNaN(height)) {
      setUserData({ ...userData, height });
    }
  }}

/>
        <Button onPress={async ()=>{await setUserInfo(authToken,userData);await updateUserData();router.navigate("/")}} title="Okay I'm done"></Button>
        <Button title="Import!" style = {{marginTop: 5,}} />
      <StatusBar style="auto" />
    </View>
     

  );
}

