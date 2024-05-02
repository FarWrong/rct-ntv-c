import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';

import { useApiContext } from './../api/ApiContext';
import { UserType, setUserInfo } from './../api/User';
import { Button } from './components/button';
import { TextBox } from './components/textbox';
import * as form from './utility/formValidation';
import { defaultPageTheme , styles} from './utility/style';


export default function Page() {
  const {authToken,updateUserData} = useApiContext();
  const [userData, setUserData] = useState<UserType>({});

  return (
    <View style={defaultPageTheme().container}>
      <Image source={require('./../assets/logo.png')} 
      style={{width: 120, height: 120}}/> 
      <Text style = {[styles.headerText, {fontSize: 20}]}>
        Your account is not registered with FitHub
      </Text>
      <Text style = {[styles.headerText, {fontSize: 15, fontWeight: 'normal', marginTop: 5}]}>
        Please import from Apple Health or fill out the following information:
      </Text>
      <TextBox 
        style={{marginTop:50}}
        placeholder={'First Name'}
        value={userData.first_name?.toString() || ''}
        onChangeText={(text) => setUserData({ ...userData, first_name: text })}
        validate={form.ValidateName}
      />
      <TextBox 
        placeholder={'Last Name'}
        value={userData.last_name?.toString() || ''}
        onChangeText={(text) => setUserData({ ...userData, last_name: text })}
        validate={form.ValidateName}
      />
      <TextBox 
        placeholder={'Gender (Male/Female/Other)'}
        value={userData.gender?.toString() || ''}
        onChangeText={(text) => setUserData({ ...userData, gender: text })}
        validate={form.ValidateGender}
      />
      <TextBox 
        placeholder={'Weight (lbs)'}
        value={userData.weight?.toString() || ''}
        onChangeText={(text) => setUserData({ ...userData, weight: text })}
        validate={form.ValidateNumber}
      />
      <TextBox 
        placeholder={'Height (in)'}
        value={userData.weight?.toString() || ''}
        onChangeText={(text) => setUserData({ ...userData, height: text })}
        validate={form.ValidateNumber}
      />
      <Button onPress={async ()=> {
        /*if (form.ValidateFirstLogin()) {
          await setUserInfo(authToken,userData);
          await updateUserData();
          router.navigate("/");
        }*/}}
        title="Okay I'm done"></Button>
      <Button title="Import!" style = {{marginTop: 5,}} />
      <StatusBar style="auto" />
    </View>
  );
}