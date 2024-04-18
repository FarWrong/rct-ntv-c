import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity, ScrollView , Dimensions} from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';

import { useApiContext } from '../../api/ApiContext';
import {styles} from '../utility/style';
import { getUserInfo } from '../../api/User';
import CalendarStrip from 'react-native-calendar-strip';
import { ButtonGroup } from 'react-native-elements';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import React from 'react';



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



const stepsdataLastWeek = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
      {data: [3000,1540,880,4430,3008,1000,2240],
      },
  ],
}; 

const exercisedataLastWeek = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {data: [20,40,10,5,50,10,20],
    },
  ],
};

export default function HomePage() {
  const { loggedIn,authToken,updateUserData,userData } = useApiContext();
  const [selectedTime, setSelectedTime] = useState(0);


  const timeOptions = ['D', 'W', 'M', 'Y'];

  const handleTimeChange = (timeIndex) => {
    setSelectedTime(timeIndex);
  }

  if(!loggedIn){
    return <Redirect href={"/login"}/>
  }
  if(userData?.firstLoggedin){
    return <Redirect href={"/submit_data"}></Redirect>
  }

  

return (
    <View style = {styles.heading}>
      <View style = {[styles.header, ]}>
      <Text style = {styles.headerText} >Hello, USER!</Text>
      <Image source={require('assets/pfp.png')} style={styles.avatar}/>
      </View>

      <ButtonGroup 
        onPress = {handleTimeChange}
        selectedIndex = {selectedTime}
        buttons= {timeOptions}
        containerStyle = {styles.buttonGroupContainer}
        textStyle = {styles.text}
       
       />
      
      
      <ScrollView contentContainerStyle = {styles.charts}>
        {selectedTime === 0 ? (
          <>
          
          <LineChartComponent data={stepsdata} title="Steps" />
          <LineChartComponent data={exercisedata} title = "Exercise Minutes" />
          <LineChartComponent data={weightdata} title="Weight"  />
          </>
        ) : (
          <>
          
          <LineChartComponent data={stepsdataLastWeek} title="Steps" />
          <LineChartComponent data={exercisedataLastWeek} title = "Exercise Minutes" />
          <LineChartComponent data={weightdata} title="Weight"  />
          </>
        )}

      
      
    </ScrollView>

    </View>
);
}