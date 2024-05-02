import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { createClient, Provider } from 'urql';

import { styles } from './utility/style'; 
import { ApiContext, useApiContext } from './../api/ApiContext';
import { Button } from './components/button';
import { defaultPageTheme } from './utility/style';
//import { TextInput } from 'react-native';
import { TextBox } from './components/textbox';
import { Ionicons } from '@expo/vector-icons';


export default function LoginPage() {
  // User/Pass Variables
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Error Logic
  const [error, setError] = useState('');

  // API Logic
  const {loginUser, signupUser} = useApiContext();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleSignUp = async () => {
    try {
      let signup_user = await signupUser(newUsername, newPassword, newEmail);
      // Optionally, close the modal after successful sign up
      console.log("si",signup_user)
      if(signup_user == "User created successfully."){
        console.log('hello');
        closeModal();
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



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
        onPress={async () => {await loginUser(username,password);}}
        title="Log In"
        style = {styles.setupbutton}
      />

{/*<Button 
        onPress={async () => {await signupUser(username,password, 'test@gmail.com');}}
        title="Sign Up"
        style = {styles.setupbutton}
      />*/}
        <TouchableOpacity onPress = {openModal}>
        <Text style={[styles.text, {marginTop: 50}]}>Don't have an account registered? Sign up here</Text>
        </TouchableOpacity>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TextBox
              style={[styles.input, { marginBottom: 10 }]}
              placeholder="Username"
              value={newUsername}
              onChangeText={setNewUsername}
              autoCapitalize="none"
            />
            <TextBox
              style={[styles.input, { marginBottom: 10 }]}
              placeholder="Email"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextBox
              style={[styles.input, { marginBottom: 10 }]}
              placeholder="Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />
            
            <Button onPress={handleSignUp} title="Sign Up" style={[styles.setupbutton, { marginTop: 10 }]} />
            {/* Close button */}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      
      <StatusBar style="auto"/>
    </View>
  );
} 