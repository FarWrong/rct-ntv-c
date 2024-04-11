import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeContext';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 130,
      height: 130,     
    },
    signup: {
      color: '#00B5EE',
      marginTop: 10,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',  

    },
    login: {
      color: 'white',
      marginTop: 10,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',

    },
    loginbutton: {
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 50,
      borderRadius: 50,
      alignItems:'center',
    },

    setupbutton: {
      backgroundColor: '#00B5EE',
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 50,
      borderRadius: 50,
      alignItems:'center',
  },
});

export function defaultPageTheme() {
  const {theme} = useTheme();
  let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return styles
}