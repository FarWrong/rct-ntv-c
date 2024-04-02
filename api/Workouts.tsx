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

export interface expectedExercise {
  name?: string;
  type?: string;
  time?: number;
}


export const getExercisePlan = async(token:string) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('http://127.0.0.1:8000/users/plan/', {
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

        return data.workout_days;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }

}

