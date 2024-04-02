import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';
import {styles} from '../utility/style';
import { useApiContext } from '../../api/ApiContext';
import { getUserInfo } from '../../api/User';

export default function Page() {
  const {authToken,exercisePlan} = useApiContext();
  const { loggedIn,userData } = useApiContext();

  const [useremail, setUserEmail] = useState("nothing here :)");
  if(!loggedIn){
    return <Redirect href={"/login"}/>
  }
  if(userData?.firstLoggedin){
    return <Redirect href={"/submit_data"}></Redirect>
  }
  return (
    <View style={defaultPageTheme().container}>
      {/*<Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>*/}
      <Image source={require('../../assets/logo.png')} style={styles.logo}/> 
      {/*<Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>*/}
      {exercisePlan ? exercisePlan[2].map((val, idx) => <View
  style={{
    backgroundColor: '#FFD700', // Golden background color
    borderRadius: 16, // Increased border radius for rounder edges
    padding: 24, // Increased padding for more space inside the block
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 4, // Elevation for Android shadow
  }}
  key={idx}
>
  <Text
    style={{
      fontSize: 20, // Increased font size
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    }}
  >
    {val.name}
  </Text>
</View>) : "lmao" }
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

