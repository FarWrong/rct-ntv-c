import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from './components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from './utility/style';
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
      <Image source={require('./../assets/logo.png')} /> 
      {/*<Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>*/}
      GREETINGS NEWCOMER PLEASE TURN ON APPLE SYNC!
      FAILING THAT, TELL US SOME THINGS ABOUT YOURSELF
      <TextBox
  placeholder="Age"
  value={userData.age?.toString() || ''}
  onChangeText={(text) => {
    const age = parseInt(text, 10);
    if (!isNaN(age)) {
      setUserData({ ...userData, age });
    }
  }}
  secure={false}
/>

<TextBox
  placeholder="First Name"
  value={userData.first_name?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, first_name: text })}
  secure={false}
/>

<TextBox
  placeholder="Last Name"
  value={userData.last_name?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, last_name: text })}
  secure={false}
/>

<TextBox
  placeholder="Gender"
  value={userData.gender?.toString() || ''}
  onChangeText={(text) => setUserData({ ...userData, gender: text })}
  secure={false}
/>

<TextBox
  placeholder="Weight"
  value={userData.weight?.toString() || ''}
  onChangeText={(text) => {
    const weight = parseInt(text, 10);
    if (!isNaN(weight)) {
      setUserData({ ...userData, weight });
    }
  }}
  secure={false}
/>

<TextBox
  placeholder="Height"
  value={userData.height?.toString() || ''}
  onChangeText={(text) => {
    const height = parseInt(text, 10);
    if (!isNaN(height)) {
      setUserData({ ...userData, height });
    }
  }}
  secure={false}
/>
        <Button onPress={async ()=>{await setUserInfo(authToken,userData);await updateUserData();router.navigate("/")}} title="Okay I'm done"></Button>
      <StatusBar style="auto" />
    </View>
     

  );
}

