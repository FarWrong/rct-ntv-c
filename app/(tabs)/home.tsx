import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity, ScrollView , Dimensions} from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';
import {styles} from '../utility/style';
import { useApiContext } from '../../api/ApiContext';
import { getUserInfo } from '../../api/User';
import CalendarStrip from 'react-native-calendar-strip';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



const chartConfig = {
  backgroundGradientFrom: '#00B5EE',
  backgroundGradientTo: '#0077B6',

  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {borderRadius: 16},
  
};

const LineChartComponent = ({data, title}) => {

  return (
      <View style = {styles.chartContainer}>
          <Text style = {styles.text}>{title}</Text>
          <LineChart
              data={data}
              width={Dimensions.get('window').width - 60}
              height={220}
              chartConfig= {chartConfig}
              bezier
              
              style = {styles.chart}
              />
              </View>

);
};



{/*export default function Page() {
  const {authToken} = useApiContext();
  const { loggedIn,userData } = useApiContext();

  const [useremail, setUserEmail] = useState("nothing here :)");
  if(!loggedIn){
    return <Redirect href={"/login"}/>
  }
  if(userData?.firstLoggedin){
    return <Redirect href={"/submit_data"}></Redirect>
  }
  return (
    <View style={defaultPageTheme().container}>
      {/*<Image source={require('../../assets/ricehat.jpg')} style={{width: bidenSize, height: bidenSize}}/>*/}
      <Image source={require('../../assets/logo.png')} style={styles.logo}/> 
      {/*<Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>*/}
      {exercisePlan ? exercisePlan[2].map((val, idx) => <View
  style={{
    backgroundColor: '#FFD700', // Golden background color
    borderRadius: 16, // Increased border radius for rounder edges
    padding: 24, // Increased padding for more space inside the block
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 4, // Elevation for Android shadow
  }}
  key={idx}
>
  <Text
    style={{
      fontSize: 20, // Increased font size
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    }}
  >
    {val.name}
  </Text>
</View>) : "lmao" }
      <TouchableOpacity style = {styles.loginbutton}>
      <Text  
        onPress={async () => {let user = await getUserInfo(authToken); setUserEmail(useremail);}}
      
      style={styles.login}>Log In</Text>
      </TouchableOpacity>
      {useremail}

      <TouchableOpacity style = {styles.setupbutton}>
      <Text style={styles.signup}>Sign Up</Text>
      </TouchableOpacity>
      
      
      <StatusBar style="auto" />
  </View>
     

  );
}*/}

const weightdata = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
      {data: [100,120,130,140,150,140,140,130,120,110,120,130],
      },
  ],
};

const stepsdata = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
      {data: [1000,1340,780,3430,7008,9000,3240],
      },
  ],
};    

const exercisedata = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {data: [10,30,5,10,40,20,10],
    },
  ],
};


export default function HomePage() {
  const { loggedIn,authToken,updateUserData,userData } = useApiContext();

  if(!loggedIn){
    return <Redirect href={"/login"}/>
  }
  if(userData?.firstLoggedin){
    return <Redirect href={"/submit_data"}></Redirect>
  }

  

return (
    <View style = {styles.heading}>
      <View style = {[styles.header, ]}>
      <Text style = {styles.headerText} >Hello, USER</Text>
      <Image source={require('assets/pfp.png')} style={styles.avatar}/>
      </View>
      
      
      <ScrollView contentContainerStyle = {styles.charts}>
      
      <LineChartComponent data={weightdata} title="Weight"  />
    <LineChartComponent data={stepsdata} title="Steps" />
    <LineChartComponent data={exercisedata} title = "Exercise" />
    </ScrollView>

    </View>
);





}