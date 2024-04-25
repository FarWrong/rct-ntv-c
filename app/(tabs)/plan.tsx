import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal,Image, Text, View, TouchableOpacity, ScrollView, GestureResponderEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';
import { getWorkoutTypes, workoutTypeType,workout_category,workout_category_to_color,expectedExercise,Plan,setUserPlan} from '../../api/Workouts';


export function returnDayasNumber(day:string) {
  let daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return daylist.indexOf(day);
}

export function returnNumberasDay(day:number) {
  let daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return daylist[day];
}

function returnTimeasNumber(time:string | undefined){
  if(!time){
    return 0;
  }
  let timelist = {
    "30min":30,
    "1hr":60,
    "1hr 30min":90,
    "2hr":120,
  }
  return timelist[time];
}

function returnNumberasTime(time:number | undefined){
  if(!time){
    return "ERR";
  }
  let timelist = {
    30:"30min",
    60:"1hr",
    90:"1hr 30min",
    120:"2hr",
  }
  return timelist[time];
}


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

function renderPlanMaker(workout_types:workoutTypeType[],plans:Plan | null,authToken:string,updateUserData:()=>Promise<String|null>) {
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


  

  function renderButtonSelector(onPress_func:((event: GestureResponderEvent) => void), text?:String | null) {
    
    
    let fontStyle = {
      fontSize: 23, // Temp fix
      fontWeight: "bold",
    };
    let clickStyle = {
      height: 35, //temp
      backgroundColor: theme.colors.primary,
      minWidth: 39, //temp
      borderRadius: 20,
      margin:3,
      padding:5
  };
    return(
    <TouchableOpacity onPress={onPress_func} style={clickStyle}>
    <View style={{justifyContent:'center',flex:1}}>
      {text ? <Text style={fontStyle}>{text}</Text> : <Text></Text>}
    </View>
    </TouchableOpacity>
    )
  }
 

  async function addToPlan(){
    if(WorkoutType && day && time){
      let submit_item:expectedExercise = {name:WorkoutType.name,time:returnTimeasNumber(time),type:WorkoutType.name} 
      let new_plan = JSON.parse(JSON.stringify(plans));
      let submit_blank:expectedExercise[][] = [[],[],[],[],[],[],[]]
      let day_index = returnDayasNumber(day);
      if(new_plan.workout_days){
        new_plan.workout_days[day_index].push(submit_item);
      }else{
        submit_blank[day_index].push(submit_item);
        new_plan.workout_days = submit_blank;
      }
      new_plan.time = returnTimeasNumber(time);
      await setUserPlan(authToken,new_plan);
      await updateUserData(); 
    }
      console.log("Submitting plan")
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  let {theme} = useTheme();
  let fontStyle = {
    fontSize: 23, // Temp fix
    fontWeight: 'bold',
    
  };
  let clickStyle = {
      height: 100, //temp
      backgroundColor: theme.colors.primary,
      minWidth: 32, //temp
      borderRadius: 20,
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
      {(WorkoutType && day && time) ? <Text onPress={async ()=>{
        await addToPlan();
        setDay(null);
        setTime(null);
        setWorkoutType(null);
      }} style={[fontStyle,{color:'green'}]}>want </Text> : <Text style={fontStyle}>want </Text>}
      <Text style={fontStyle}>to do </Text>
      {renderButtonSelector(()=>{setModalChildren("workoutTypes");setIsModalVisible(true);return;}, WorkoutType?.name )}
      <Text style={fontStyle}> every </Text>
      {renderButtonSelector(()=>{setModalChildren("days");setIsModalVisible(true);return;}, day )}
      <Text style={fontStyle}> for </Text>
      {renderButtonSelector(()=>{setModalChildren("time");setIsModalVisible(true);return;}, time )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {renderModalChildren()}
      </EmojiPicker>
    </View>
  );
}

function renderDay(ex:expectedExercise[],index:number){
  return(<View>{ex.map((val,idx)=>(RenderE(val,index)))}</View>)
}

function RenderE(ex:expectedExercise,index:number){
  const {theme} = useTheme();
  let fontStyle = {
    fontSize: 19, //temp
  };
  return(<View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
}}><Text style={fontStyle}>I will do </Text>
  <Text style={fontStyle}>{ex.name}</Text>
  <Text style={fontStyle}>On</Text>
  <Text style={fontStyle}>{returnNumberasDay(index)}</Text>
  <Text style={fontStyle}> For </Text>
  <Text style={fontStyle}>{returnNumberasTime(ex?.time)}</Text>
  </View>

  );
}


export default function Page() {
  const {authToken,exercisePlan,updateUserData} = useApiContext();
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
        {renderPlanMaker(WorkoutTypes,exercisePlan,authToken,updateUserData)}
        
      <ScrollView>
        {exercisePlan?.workout_days.map((val, idx) => (
          <View key={idx}>{renderDay(val, idx)}</View>
        ))}
      </ScrollView>
    </View>

  )
} 