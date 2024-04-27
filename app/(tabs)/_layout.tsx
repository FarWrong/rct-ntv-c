import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, Stack, useRootNavigationState } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';
import { StyleSheet } from 'react-native';
import { getNextExercise,startExerciseDirect } from '../../api/Exercise';
import { UserType } from '../../api/User';
import { Plan } from '../../api/Workouts';

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft:30,
  },
  button: {
    top: -30,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});




export default () => {
  const { authToken,loggedIn,userData ,updateUserData,exercisePlan,exercises} = useApiContext();
  
  function returnButtonSelector(user:UserType|null, plan:Plan|null){
    if(user?.isWorking){
      return(<TouchableOpacity style={styles.button} onPress={()=>{
        let next = getNextExercise(exercisePlan,exercises);
        if(next){
          startExerciseDirect(authToken,next);
          updateUserData();
        }
      }}>
        
        <Ionicons name="checkmark-done-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>)
    }
    return(
      
      <TouchableOpacity style={styles.button} onPress={()=>{
        let next = getNextExercise(exercisePlan,exercises);
        if(next){
          startExerciseDirect(authToken,next);
          updateUserData();
        }
      }}>
        
        <Ionicons name="bicycle" size={40} color="#fff" />
      </TouchableOpacity>
    )
  }
  
  const { theme } = useTheme();
  return (
    <>
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // Icon List
        //sss
        if (route.name === 'shop') iconName = 'bag';
        else if (route.name == 'home')iconName = 'home';
        else if (route.name === 'workout') iconName = 'barbell';
        else if (route.name === 'friends') iconName = 'people';
        else if (route.name === 'account') iconName = 'person';
        else if (route.name === 'plan') iconName = 'barbell';
        else iconName = 'help';
        // If icon isn't selected
        if (!focused) iconName += "-outline"
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: 'gray',
    })    
  }
    >
      

      { /*Order of tabs*/ }
      <Tabs.Screen name="home" options={{title: "Home"}}/>
      <Tabs.Screen name="workout" options={{title: "Workout"}}/>
      <Tabs.Screen
        name="exercise"
        options={{
          tabBarButton: () => (returnButtonSelector(userData,exercisePlan)
          ),
        }}
      />
      <Tabs.Screen name="friends" options={{title: "Friends"}}/>
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
      

    </Tabs>
  </>
  );
}

