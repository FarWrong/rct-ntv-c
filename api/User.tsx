// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { router } from 'expo-router';
import { ApiContextType } from './ApiContext';

export const getUserGender = (context:ApiContextType) => {
  context
  if (!context) {
    throw new Error('getApiKey must be used within a ApiProvider');
  }
  return context;
};

export interface UserType {
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
  weight?: number;
}


export const getUserInfo = async(token: string) => {
  console.log(token)
  let userInfo: UserType = {}
  let errorMessage = "success"
  try{
      const response = await fetch('http://127.0.0.1:8000/users/gender', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          
          });
      
      if (!response.ok) {

          console.error("Failed to fetch token.");
          return userInfo;
      }
        const data = await response.json();
        
        userInfo.email = data.email;
        return userInfo;
  }catch(error:any){
      errorMessage = error;
      return userInfo;
  }
}
