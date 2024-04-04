import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useApiContext,ApiProvider } from '../../api/ApiContext';
import { acceptFriendRequest } from '../../api/Friends';
import { Button } from '../components/button';
import { TextBox } from '../components/textbox';
import { defaultPageTheme } from '../utility/style';


export default function FriendsPage() {
    const { loggedIn,authToken,updateUserData,userData } = useApiContext();

    function friendPendingComponent(username: string, index: number) {
        return (
          <View key={index} style={styles.friendRequestContainer}>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={async () => {
                  await acceptFriendRequest(authToken, username);
                  await updateUserData();
                }}
              >
                <Text style={styles.buttonText}>Accept</Text>
                <Ionicons name={"checkmark"} size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.denyButton]}>
                <Text style={styles.buttonText}>Deny</Text>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      
      function friendComponent(username: string, index: number) {
        return (
          <View key={index} style={styles.friendContainer}>
            <Text style={styles.username}>{username}</Text>
          </View>
        );
      }
 
    useEffect(() => {
        const checkAuth = async () => {
          try {
            await updateUserData();
          } catch (error) {
            console.error('Error checking authentication:', error);
          }
        };
    
        checkAuth();
      }, []);
    return (
        <View style={defaultPageTheme().container}>
            
            {userData?.received_friend_requests?.map((val, idx) => friendPendingComponent(val,idx))}
            {userData?.friends?.map((val, idx) => friendComponent(val,idx))}

            <Button
                onPress={() => {router.replace('/' );}}
                title="Send Friend Request"
            />
            <StatusBar style="auto"/>
        </View>
    );
}
const styles = StyleSheet.create({
    friendRequestContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 16,
      marginBottom: 10,
      elevation: 2,
    },
    friendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 16,
      marginBottom: 10,
      elevation: 2,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginLeft: 10,
    },
    acceptButton: {
      backgroundColor: '#4CAF50',
    },
    denyButton: {
      backgroundColor: '#F44336',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 5,
    },
  });