import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';
import {styles} from '../utility/style';
import { useApiContext } from '../../api/ApiContext';
import { getUserInfo } from '../../api/User';

export default function Page() {
  const {authToken} = useApiContext();
  const [useremail, setUserEmail] = useState("nothing here :)");

  return (
    <View style={defaultPageTheme().container}>
      {/*<Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>*/}
      <Image source={require('../../assets/logo.png')} style={styles.logo}/> 
      {/*<Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>*/}
      
      <TouchableOpacity style = {styles.loginbutton}>
      <Text  
        onPress={async () => {let user = await getUserInfo(authToken); setUserEmail(useremail);}}
      
      style={styles.login}>Log In</Text>
      </TouchableOpacity>
      {useremail}

      <TouchableOpacity style = {styles.setupbutton}>
      <Text style={styles.signup}>Sign Up</Text>
      </TouchableOpacity>
      
      
      <StatusBar style="auto" />
    </View>
     

  );
}

