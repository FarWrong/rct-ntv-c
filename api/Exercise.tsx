// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { router } from 'expo-router';
import { ApiContextType } from './ApiContext';
import { workout_category } from './Workouts';

function string_to_date(input: string): Date {
  // Parse the input string into a Date object
  const date = new Date(input);

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    // If the parsed date is invalid, throw an error
    throw new Error('Invalid date string');
  }

  // Return the parsed Date object
  return date;
}

export interface exerciseType{
  start:Date | undefined,
  workout_type:workoutTypeType
  end: Date | undefined,
}


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

export interface Plan{
  workout_days:Array<Array<expectedExercise>>;
  difficulty_level?:string;
  plan_name?:string;
  description?:string;
}


export interface workoutTypeType {
  name: string;
  category: workout_category;
}
export interface expectedExercise {
  name: string;
  type: string;
  time: number;
}



export function workout_category_to_color(category: workout_category) {
  switch (category) {
    case workout_category.cardio:
      return '#FF0000';
    case workout_category.flexibility:
      return '#00FF00';
    case workout_category.strength:
      return '#0000FF';
  }

}
export const startExcersise = async(token:string) =>{
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
          console.log("WHAT");
          return null;
      }
        const data = await response.json();
        console.log("PLANNNN",data);
        return data;
  }catch(error:any){
      console.log(error);
      console.log("WHAT1");
      return null;
  }
}

interface exportedExercise {
  name?: string;
  type?: string;
  time?: number;
  days?: number;
}

export const setUserPlan = async(token:string,plan:Plan) =>{
  let errorMessage = "success"
  let real_work:exportedExercise[] = []
  for(let i =0;i<plan.workout_days.length;i++){
    for(let j=0;j<plan.workout_days[i].length;j++){
      let expect:expectedExercise = plan.workout_days[i][j]
      let real = real_work.find((val)=> (val.name == expect.name) && val.time == expect.time)
      if(!real){
        real_work.push({
          name: expect.name,
          type: expect.type,
          days: 1 << i,
          time: expect.time
        });
      }else{
        if(real.days){
          real.days |= 1 << i;
        }
      }        
    }
  }
  
  let final_val = {
    workout_days:real_work,
    difficulty_level:plan.difficulty_level,
    plan_name:plan.plan_name,
    description:plan.description
  }

  try{
      const response = await fetch('http://127.0.0.1:8000/users/plan/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify(final_val),
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return null;
      }
        const data = await response.json();
        console.log(data);
        return "success!";
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}

export const getExercise = async(token:string) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('http://127.0.0.1:8000/users/exercise_all/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          }
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return null;
      } 
        const data = await response.json();
        let return_list:exerciseType[] = []
        for (let i=0;i<data.ex.length;i++){
          let ex =data.ex[i];
          let return_item:exerciseType = {
            start:string_to_date(ex.start),
            end:string_to_date(ex.end),
            workout_type:{
              name:ex.name,
              category:ex.category
            }
          }
          return_list.push(return_item)
        }
        console.log("Excersises here : ",return_list)
        return return_list;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}

export const startExercise = async(token:string,exp:expectedExercise) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('http://127.0.0.1:8000/users/exercise_all/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify(exp),
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return null;
      } 
        const data = await response.json();
        let return_list:exerciseType[] = []
        for (let i=0;i<data.ex.length;i++){
          let ex =data.ex[i];
          let return_item:exerciseType = {
            start:string_to_date(ex.start),
            end:string_to_date(ex.end),
            workout_type:{
              name:ex.name,
              category:ex.category
            }
          }
          return_list.push(return_item)
        }
        console.log("Excersises here : ",return_list)
        return return_list;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}