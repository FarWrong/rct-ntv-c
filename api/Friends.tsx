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

enum BloodType {
  AP = 'A+',
  AN = 'A-',
  BP = 'B+',
  BN = 'B-',
  ABP = 'AB+',
  ABN = 'AB-',
  OP = 'O+',
  ON = 'O-',
}

export interface UserType {
  first_name?: string;
  last_name?: string;
  date_of_birth?:Date;
  email?: string;
  first_login?:Boolean;
  blood_type?:BloodType;
  wheel_chair?:Boolean;
  age?: number;
  gender?: string;
  firstLoggedin?:boolean;
  weight?: number;
  //NOTE THIS IS THE CALCULATED NUMBER IN INCHES
  height?: number;
}


export const sendFriendRequest = async(token:string,username:string) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/friend/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify({ action:"send_request", friend_username:username }),
          });
      
      if (!response.ok) {
        
          const data = await response.json();
          console.log(data);
          console.error("Failed to fetch token.");
          return data.error;
      }
        const data = await response.json();
        console.log(data);
        return "success!";
  }catch(error:any){
      console.log("ERR",error);
      errorMessage = error;
      return "BIg error";
  }

}


export const acceptFriendRequest = async(token: string,username:string) => {
  let errorMessage = "success"
  try{
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/friend/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify({ action:"accept_request", friend_username:username }),
          });
      
      if (!response.ok) {
          console.log(response);
          console.error("Failed to fetch token.");
          return null;
      }
        const data = await response.json();
        console.log(data);
        return errorMessage;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return error;
  }
}
