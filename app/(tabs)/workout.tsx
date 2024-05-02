import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useApiContext } from '../../api/ApiContext';
import useHealthData from '../../api/HealthKit';
import { exerciseType } from '../../api/Exercise';

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    backgroundColor: '#F6F7FB'
  },
  header: {
    backgroundColor: '#00B5EE',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  box: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#000'
  },
  workoutItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boldText: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 7,  
    backgroundColor: '#00B5EE',  
    width: '50%',  
    borderRadius: 2,  
  },
  progressBarContainer: {
    backgroundColor: '#E0E0E0',  
    borderRadius: 2,
    overflow: 'hidden', 
    height: 4,
    marginVertical: 9,
  }
});

function renderWorkoutItem(item: exerciseType) {
  return (
    <View style={styles.workoutItem}>
      <Text style={[styles.text, styles.boldText]}>{item.workout_type.name}</Text>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>Start: {item.start?.toLocaleTimeString()}</Text>
        {item.end && <Text style={styles.text}>End: {item.end.toLocaleTimeString()}</Text>}
        <Text style={styles.text}>Duration: {item.expectedTime} min</Text>
      </View>
    </View>
  );
}


export default function WorkoutPage() {
  const { exercises } = useApiContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { steps } = useHealthData();

  const handleDateSelected = (date) => {
    setCurrentDate(date);
  };

  const isSameDay = (d1, d2) => {
    return new Date(d1).toDateString() === new Date(d2).toDateString();
  };

  useEffect(() => {
    console.log("EXERCISE DATA HERE:", exercises);
    setCurrentDate(new Date());
  }, [exercises]);

  return (
    <ScrollView style={styles.heading}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Data</Text>
      </View>
      <CalendarStrip
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        dateNumberStyle={[styles.text, { fontSize: 10, fontWeight: 'bold' }]}
        dateNameStyle={styles.text}
        showMonth={false}
        updateWeek={true}
        selectedDate={currentDate}
        onDateSelected={handleDateSelected}
      />
      {exercises
        .filter(val => val.start && val.end && isSameDay(val.start, currentDate))
        .map(renderWorkoutItem)}
      <View style={styles.box}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Steps</Text>
        <Text style={[styles.text, {marginTop: 5, fontWeight: 'bold', fontSize: 20}]}>
          {steps}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Compared to your friends</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      {(exercisePlan && exercisePlan[2]) 
          ? exercisePlan[2]?.map((val, idx) => <Text>val.name</Text>)
          : <Text>lmao</Text>}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Compared to your friends</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Workouts Failed</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      <View style={{height: 20}}></View>
    </ScrollView>
  );
}

