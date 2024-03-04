// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { router } from 'expo-router';

export interface ApiContextType {
  authToken: string;
  loggedIn: boolean;
  loginUser: (username:string,password:string) => Promise<boolean>;
  signoutUser: () => void;
}


export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const loginUser = async(username:string,password:string) => {
    let errorMessage = "success"
    try{
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            });
        
        if (!response.ok) {
            console.error("Failed to fetch token.");
            return false;
        }
          const data = await response.json();
          setAuthToken(data.access);
          setLoggedIn(true);
          router.replace('/home');
          return true;
    }catch(error:any){
        errorMessage = error;
        return false;
    }
  }

  const signoutUser = () =>{
        setAuthToken('');
        setLoggedIn(false);
        router.replace('/login');
        return true;
  }

  return(
  <ApiContext.Provider value={{ authToken,loggedIn,loginUser,signoutUser}}>
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
