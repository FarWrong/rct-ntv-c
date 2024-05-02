import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useApiContext } from '../../api/ApiContext';
import { defaultPageTheme, styles } from '../utility/style';
import useHealthData from '../../api/HealthKit';

export interface simpleData{
  data:number[]
}

export interface GraphData
{
  labels: string[]
  datasets: simpleData[]
};

export default function WorkoutPage() {
  const { loggedIn,authToken,updateUserData,userData , exercisePlan } = useApiContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const {steps} = useHealthData();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <ScrollView style = {styles.heading}>
      <View style = {[styles.header, ]}>
        <Text style = {styles.headerText} >Health Data</Text>
      </View>
      <CalendarStrip 
        style = {{height:100, paddingTop:20, paddingBottom:10,  }}
        dateNumberStyle= {[styles.text, {fontSize: 10, fontWeight: 'bold'}]}
        dateNameStyle = {styles.text}
        showMonth= {false}
        updateWeek = {true}
        selectedDate = {currentDate}
      />
      <View style = {styles.content}>
        <View style = {styles.row}>
          <Text style = {[styles.text, {fontWeight: 'bold'}]}>Steps</Text>
        </View>
        <View style = {[styles.box, {padding: 30}]}>
          <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold', fontSize: 20}]} >
           {steps}
          </Text>
        </View>
      </View>
      {(exercisePlan && exercisePlan[2]) 
          ? exercisePlan[2]?.map((val, idx) => <Text>val.name</Text>)
          : <Text>lmao</Text>}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Compared to your friends</Text>
        </View>
        <View style={[styles.box, {width: '100%', padding: 30}]}>
          <Text style={[styles.text, {marginRight: 10}]}>Workouts Completed</Text>
          <View style={styles.bar}></View> 
        </View>
        <View style={[styles.box, {width: '100%', padding: 30}]}>
          <Text style={[styles.text, {marginRight: 10}]}>Workouts Failed</Text>
          <View style={styles.bar}></View> 
        </View>
        <View style={[styles.box, {width: '100%', padding: 30}]}>
          <Text style={[styles.text, {marginRight: 10}]}>Steps</Text>
          <View style={styles.bar}></View> 
        </View>
        <View style={{height:20}}></View>
      </View>
    </ScrollView>
  );
}