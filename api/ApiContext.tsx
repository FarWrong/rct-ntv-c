// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { UserType } from './User'
import { getUserInfo } from './User';
import { acceptFriendRequest } from './Friends';
import { ExpectedExercise, getExercisePlan, Plan } from './Workouts'
import { WorkoutTypeType } from './Workouts';
import { getExercise, exerciseType } from './Exercise'


export interface ApiContextType {
  authToken: string;
  loggedIn: boolean;
  loginUser: (username:string,password:string) => Promise<String | null>;
  signoutUser: () => void;
  updateUserData: () => Promise<String | null>;
  userData: UserType | null;
  exercisePlan: Plan | null;
  exercises:Array<exerciseType>
}


export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [exercisePlan, setExercisePlan] = useState<Plan| null>(null);
  const [exercises, setExercises] = useState<Array<exerciseType>>([]);



  const signoutUser = () =>{
        setAuthToken('');
        setLoggedIn(false);
        setUserData(null);
        router.replace("/login");
        return true;
  }



  const updateUserData = async(token?:string) => {
    let data = await getUserInfo(token ? token : authToken);
    if(data){
      setUserData(data);
      let plan = await getExercisePlan(token ? token : authToken);
      setExercisePlan(plan);
      let exercises = await getExercise(token ? token : authToken);
      setExercises(exercises);
      return "passed"
    }else{
      signoutUser();
      return "failed"
    }
  }

  

  const loginUser = async(username:string,password:string) => {
    try{
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
        
      if (!response.ok) {
        return "could not connect to server";
      }
      
      const data = await response.json();
      setAuthToken(data.access);
      setLoggedIn(true);
      router.replace("/");
      updateUserData(data.access);
      return null;
    
    }catch(error:any){
      return error;
    }
  }
  useEffect(() => {
  // Perform any necessary actions when userData changes
  console.log('userData updated:', userData);
  }, [userData]);

  return(
    <ApiContext.Provider value={{ authToken,loggedIn,loginUser,signoutUser,updateUserData,userData,exercisePlan,exercises}}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('getApiKey must be used within a ApiProvider');
  }
  return context;
};

//returns a tuple where the first item is error/success message and second is truth value of login attempt
