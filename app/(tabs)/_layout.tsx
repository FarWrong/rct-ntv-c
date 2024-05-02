import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, Stack, useRootNavigationState } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useEffect, useState } from 'react';
import { Modal,Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';
import { StyleSheet } from 'react-native';
import { endExercise, exerciseType, getNextExercises,startExerciseDirect } from '../../api/Exercise';
import { UserType } from '../../api/User';
import { ExpectedExercise, Plan } from '../../api/Workouts';
import { styles } from '../utility/style';
import { returnNumberAsTime } from './plan';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { getAverageHeartRate } from '../../api/HealthKit';
const styles1 = StyleSheet.create({
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
  button2: {
    top: -30,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonContainer: {
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  countdownTimer: {
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
  const [wrkSlct, setWrkSlctVisible] = useState(false);
  const [workoutOptions, setWorkoutOptions] = useState<ExpectedExercise[]>([]);
  const [time, setTime] = useState(Date.now());
  const [duration,setDuration] = useState(0);
  const [starter,setStarter] = useState(new Date());
  const [isplaying,setisPlaying] = useState(false);
  useEffect(() => {
    const updateOptions = async () => {
      console.log("Updating workout options");
      let options = getNextExercises(exercisePlan, exercises);
      setWorkoutOptions(options);
    };
    updateOptions();

  }, [authToken, loggedIn, userData, exercisePlan, exercises]);

  async function onPress_func(expect_ex: ExpectedExercise) {
    await startExerciseDirect(authToken, expect_ex);
    setWrkSlctVisible(false);
    await updateUserData();
    setStarter(new Date());
    setDuration(expect_ex.time * 60);
    setisPlaying(true);
  }


  function renderExcerciseSelector(expect_ex:ExpectedExercise){
    const style = StyleSheet.create({
      button: {
        backgroundColor: '#00B5EE',
        borderRadius: 15,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
      }
    });
    return(
      <TouchableOpacity onPress={() => onPress_func(expect_ex)} style={style.button}>
          <Text style={style.buttonText}>{expect_ex.name+ "for "+returnNumberAsTime(expect_ex.time)}</Text>
      </TouchableOpacity>
    )
  }

  

  function returnButtonSelector(user:UserType|null, plan:Plan|null){
    if(user?.isWorking){
      return (
          //is excercising
          <View style={{top: -30}}>
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size={70}
            onComplete={() => {
              // do your stuff here
              setisPlaying(false);
              return { } // repeat animation in 1.5 seconds
            }}
        
          >
            {({ remainingTime }) => (
              <TouchableOpacity
              style={styles1.countdownTimer}
              onPress={async () => {
                let hrt_rate = await getAverageHeartRate(starter)
                await endExercise(authToken,hrt_rate);
                await updateUserData();
              }}
            >
          <Ionicons name="checkmark-done-circle-outline" size={40} color="blue" />
          </TouchableOpacity>)}
          </CountdownCircleTimer>
          </View>
      );
    }
    if(workoutOptions.length > 0){
    return(
      //has workouts
      <TouchableOpacity style={styles1.button} onPress={()=>{
        if(workoutOptions.length > 0){
          setWrkSlctVisible(true);
        }
      }}>
        
        <Ionicons name="bicycle" size={40} color="white" />
      </TouchableOpacity>
    )
    }
    return(
      //has no workouts
      <TouchableOpacity style={styles1.button2}>
        
        <Ionicons name="bicycle" size={40} color="white" />
      </TouchableOpacity>
    )
  }
  
  const { theme } = useTheme();

  return (
    <>
    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={wrkSlct}
                        onRequestClose={() => setWrkSlctVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {workoutOptions.map((val,idx)=>{return renderExcerciseSelector(val)})}
                                <TouchableOpacity onPress={() => setWrkSlctVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> 
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
      <Tabs.Screen name="feed" options={{title: "Feed"}}/>
      <Tabs.Screen
        name="exercise"
        options={{
          tabBarButton: () => (returnButtonSelector(userData,exercisePlan)
          ),
        }}
      />
      <Tabs.Screen name="friends" options={{title: "Friends"}}/>
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
      <Tabs.Screen name="plan" options={{title: "Plan"}}/>

    </Tabs>
  </>
  );
}

