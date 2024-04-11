import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal,Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';
import { getWorkoutTypes, workoutTypeType,workout_category,workout_category_to_color,expectedExercise,Plan} from '../../api/Workouts';

export  function EmojiPicker({ isVisible, children, onClose }) {
  const styles = StyleSheet.create({
    modalContent: {
      height: '25%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    }});
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent} >
        <View >
          <Text >Choose a sticker</Text>
        </View>
        {children}
      </View>
    </Modal>
  );
  }


function renderClickableSelector(newname: string,color:string,onPressFunc:(name:string)=>void){
  let style = {
    backgroundColor: color,
    borderRadius: 20,
    margin: 10
  }
  return (
    <TouchableOpacity onPress={()=>{onPressFunc(newname)}} style={style}>
      <Text >{newname}</Text>
    </TouchableOpacity>
  )
}

function renderPlanMaker(workout_types:workoutTypeType[],plans:Plan | null) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [WorkoutType, setWorkoutType] = useState<workoutTypeType|null>(null);
  const [day, setDay] = useState<string|null>(null);
  const [time, setTime] = useState<string|null>(null);
  const [modalChildren,setModalChildren] = useState<string|null>(null);

  function workout_type_onPress(name: string){
    let workoutType = workout_types.find((val)=>val.name == name)
    if(workoutType){
      setWorkoutType(workoutType);
    }
    setIsModalVisible(false);
  }

  function date_onPress(name: string){
    setDay(name);
    setIsModalVisible(false);
  }

  function time_onPress(name: string){
    setTime(name);
    setIsModalVisible(false);
  }

  function renderModalChildren(){
    if(modalChildren == "workoutTypes"){
      return workout_types.map((val,idx)=> renderClickableSelector(val.name,workout_category_to_color(val.category),workout_type_onPress))
    }else if(modalChildren == "days"){
      return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((val,idx)=> renderClickableSelector(val,"blue",date_onPress))
    }else if(modalChildren == "time"){
      return ["30min","1hr","1hr 30min","2hr"].map((val,idx)=> renderClickableSelector(val,"blue",time_onPress))
    }
  }

  async function addToPlan(){
    if(WorkoutType && day && time){
      let submit_item:expectedExercise = {name:WorkoutType.name,time:parseInt(time.split("hr")[0]),type:WorkoutType.name} 
      let new_workout_days = plans?.workout_days ? [...plans.workout_days,[submit_item]] : [[submit_item]];
      let new_plan = JSON.parse(JSON.stringify(plans));
      new_plan.workout_days = new_workout_days;
      console.log(new_plan);
    }

      console.log("Submitting plan")
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  let {theme} = useTheme();
  let fontStyle = {
    fontSize: theme.fontSizes.large,
  };
  let clickStyle = {
      height: theme.fontSizes.large,
      backgroundColor: theme.colors.primary,
      minWidth: theme.fontSizes.large * 2,
      borderRadius: 20,
      marginTop: 7,
      marginLeft: 10,
      marginRight: 10,
  };
  return (
    <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
    }}>
      <Text style={fontStyle}>I </Text>
      {(WorkoutType && day && time) ? <Text onPress={()=>{
        addToPlan();
      }} style={[fontStyle,{color:'green'}]}>want  </Text> : <Text style={fontStyle}>want </Text>}
      <Text style={fontStyle}>to do </Text>
      <TouchableOpacity onPress={()=>{setModalChildren("workoutTypes");setIsModalVisible(true);return;}} style={clickStyle}><Text>{WorkoutType?.name}</Text></TouchableOpacity>
      <Text style={fontStyle}>every</Text>
      <TouchableOpacity onPress={()=>{setModalChildren("days");setIsModalVisible(true);return;}} style={clickStyle}><Text>{day}</Text></TouchableOpacity>
      <Text style={fontStyle}>for</Text>
      <TouchableOpacity onPress={()=>{setModalChildren("time");setIsModalVisible(true);return;}} style={clickStyle}><Text>{time}</Text></TouchableOpacity>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {renderModalChildren()}
      </EmojiPicker>
    </View>
  );
}



export default function Page() {
  const {authToken,exercisePlan} = useApiContext();
  const [WorkoutTypes, setWorkoutTypes] = useState<workoutTypeType[]>([]);
  useEffect(() => {
    const getTypesType = async () => {
      try {
        let work = await getWorkoutTypes(authToken);
        if(work){
          setWorkoutTypes(work);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    getTypesType();
  }, []);
  return (
      <View style = {styles.heading}>
        {renderPlanMaker(WorkoutTypes,exercisePlan)}
      <ScrollView showsVerticalScrollIndicator = {false}>
      </ScrollView>
    </View>

  )
} 