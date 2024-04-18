import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useApiContext } from '../../api/ApiContext';
import { defaultPageTheme, styles } from '../utility/style';




export default function WorkoutPage() {
    const { loggedIn,authToken,updateUserData,userData , exercisePlan, } = useApiContext();
    const [currentDate, setCurrentDate] = useState(new Date());


    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    return (
        <View style = {styles.heading}>
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
        <View
        style = {styles.content}>
            <View style = {styles.row}>
                <Text style = {[styles.text, {fontWeight: 'bold'}]}>Steps</Text>
    
            </View>
            <View style = {[styles.box, {padding: 30}]}>
            <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold', fontSize: 20}]} >
                8,760
            </Text>
            </View>
      
    </View>

    {exercisePlan ? exercisePlan[2].map((val, idx) => <Text>val.name</Text>):"lmao"}
    
    <View style={styles.content}>
        <View style={styles.row}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>Compared to your friends</Text>
        </View>
    
        <View style={[styles.box, {width: '100%', padding: 30}]}>
        
                <Text style={[styles.text, {marginRight: 10}]}>Calories Burned</Text>
               
                <View style={styles.bar}></View> 
              
      
      
        </View>
      </View>
    </ScrollView>
  );
}