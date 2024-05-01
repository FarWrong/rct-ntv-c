// ThemeContext.tsx
import { router } from 'expo-router';
import React, { createContext, useContext, ReactNode, useState } from 'react';

import { ApiContextType } from './ApiContext';
import { expectedExercise, workoutTypeType } from './Workouts';
import { exerciseType, string_to_date } from './Exercise';


export interface feedType extends exerciseType{
  user:string,
}



export const getFriendFeed = async(token:string) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('http://127.0.0.1:8000/users/get_feed/', {
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
        
        let ret:feedType[] = []
        for (let i=0;i<data.length;i++){
          let ex =data[i];
          let return_item:feedType = {
            start:string_to_date(ex.start),
            end:string_to_date(ex.end),
            workout_type:{
              name:ex.workout_type.name,
              category:ex.workout_type.category
            },
            expectedTime:ex.expectedTime,
            user:ex.user
          }
          ret.push(return_item)
        }
        console.log("RETTTTT",ret);
        
        return ret;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}
