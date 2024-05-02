// ThemeContext.tsx
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState } from 'react';

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
  date_of_birth?: Date;
  email?: string;
  first_login?: Boolean;
  blood_type?: BloodType;
  wheel_chair?: Boolean;
  age?: number;
  gender?: string;
  firstLoggedin?: Boolean;
  weight?: number;
  friends?: Array<string>;
  sent_friend_requests?: Array<string>;
  received_friend_requests?: Array<string>;
  //NOTE THIS IS THE CALCULATED NUMBER IN INCHES
  height?: number;
  username?: string;
  isWorking?: Boolean;
}


export const setUserInfo = async(token:string,user:UserType) =>{
  user.first_login = false;
  let errorMessage = "success"
  try {
    const response = await fetch('https://fithub-backend-d06l.onrender.com/users/userinfo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "  + token
      },
      body: JSON.stringify(user),
    });
      
    if (!response.ok) {
      console.error("Failed to fetch token.");
      return null;
    }
    
    const data = await response.json();
    console.log(data);
    return "success!";

  } catch(error:any) {
    console.log(error);
    errorMessage = error;
    return null;
  }
}


export const getUserInfo = async(token: string) => {
  let userInfo: UserType = {}
  let errorMessage = "success"
  try{
    const response = await fetch('https://fithub-backend-d06l.onrender.com/users/userinfo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "  + token
      },    
    });
      
    if (!response.ok) {
      console.error("Failed to fetch token.");
      return null;
    }
      
    const data = await response.json();
    console.log(data);
    userInfo.email = data.email;
    userInfo.firstLoggedin = data.first_login;
    userInfo.last_name = data.last_name
    userInfo.sent_friend_requests = data.pending_friend_requests;
    userInfo.received_friend_requests = data.received_friend_requests;
    userInfo.friends = data.friends;

    userInfo.height = data.height;
    userInfo.weight = data.weight;
    userInfo.username = data.username;
    userInfo.age = data.age;
    userInfo.isWorking = data.is_working;
    console.log(userInfo,"wegot it!")
    return userInfo;

  } catch(error:any) {
    console.log(error);
    errorMessage = error;
    return null;
  }
}
