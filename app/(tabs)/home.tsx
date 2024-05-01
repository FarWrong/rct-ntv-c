import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Dimensions} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';


import { useApiContext } from '../../api/ApiContext';
import useHealthData, { GraphData } from '../../api/HealthKit';
import { getUserInfo } from '../../api/User';
import { Button } from '../components/button';
import { Popup } from '../components/popup';
import { TextBox } from '../components/textbox';
import { ValidateNumber } from '../utility/formValidation';
import { styles } from '../utility/style';


const chartConfig = {
  backgroundGradientFrom: '#00B5EE',
  backgroundGradientTo: '#0077B6',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {borderRadius: 16},
};

const LineChartComponent = ({data, title}) => {
  return (
    <View key={0} style={styles.chartContainer}>
      <Text style={styles.text}>{title}</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 60}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};


/** Determines graph type */
type GraphType = 'steps' | 'exercise' | 'weight' | undefined;
/** Determines timeframe of the graph */
type TimePeriod = 'Week' | 'Month' | 'Year'; 
/** Determines the day of the week  [TimePeriod 'week'] */
type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | undefined;
/** Determines how many weeks have passed [TimePeriod 'month'] */
type Week = "3 weeks" | "2 weeks" | "1 week" | "This week" | undefined;
/** Determines the month of the year [TimePeriod 'year'] */
type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' |
             'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | undefined;


/** Converts Day type to string */
const dayString = (d:Day) => {
  if (d === 'Sun') return 'Sunday';
  else if (d === 'Mon') return 'Monday';
  else if (d === 'Tue') return 'Tuesday';
  else if (d === 'Wed') return 'Wednesday';
  else if (d === 'Thur') return 'Thursday';
  else if (d === 'Fri') return 'Friday';
  else if (d === 'Sat') return 'Saturday';
  else return 'Error';
}
/** Converts Week type to string */
const weekString = (w:Week) => {
  if (w === '3 weeks') return '3 weeks ago';
  else if (w === '2 weeks') return '2 weeks ago';
  else if (w === '1 week') return '1 week ago';
  else if (w === 'This week') return 'This week';
  else return 'No week';
}
/** Converts Month type to string */
const monthString = (m:Month) => {
  if (m === 'Jan') return 'January';
  else if (m === 'Feb') return 'February';
  else if (m === 'Mar') return 'March';
  else if (m === 'Apr') return 'April';
  else if (m === 'May') return 'May';
  else if (m === 'Jun') return 'June';
  else if (m === 'Jul') return 'July';
  else if (m === 'Aug') return 'August';
  else if (m === 'Sep') return 'September';
  else if (m === 'Oct') return 'October';
  else if (m === 'Nov') return 'November';
  else if (m === 'Dec') return 'December';
  else return 'Error';
}


/** 
 * Day Popup layout 
 * 
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param changeDay   - Changes the day to edit
 */
interface DayButtonProps {
  togglePopup: (boolean) => void;
  changeDay: (Day) => void;
}
const DayButton: React.FC<DayButtonProps> = ({togglePopup, changeDay}) => {
    // Chooses day to change and closes day popup
    const handleDayPopup = (d:Day) => {
      changeDay(d);
      togglePopup(false);
    }
  return (
    <>
      <Button title='Sunday' onPress={() => handleDayPopup('Sun')}/>
      <Button title='Monday' onPress={() => handleDayPopup('Mon')}/>
      <Button title='Tuesday' onPress={() => handleDayPopup('Tue')}/>
      <Button title='Wednesday' onPress={() => handleDayPopup('Wed')}/>
      <Button title='Thursday' onPress={() => handleDayPopup('Thur')}/>
      <Button title='Friday' onPress={() => handleDayPopup('Fri')}/>
      <Button title='Saturday' onPress={() => handleDayPopup('Sat')}/>
    </>
  );
}


/** 
 * Week Popup layout 
 * 
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param changeWeek  - Changes the week to edit
 */
interface WeekButtonProps {
  togglePopup: (boolean) => void;
  changeWeek: (Day) => void;
}
const WeekButton: React.FC<WeekButtonProps> = ({togglePopup, changeWeek}) => {
  // Chooses day to change and closes day popup
  const handleWeekPopup = (w:Week) => {
    changeWeek(w);
    togglePopup(false);
  }
return (
  <>
    <Button title='Sunday' onPress={() => handleWeekPopup('3 weeks')}/>
    <Button title='Monday' onPress={() => handleWeekPopup('2 weeks')}/>
    <Button title='Tuesday' onPress={() => handleWeekPopup('1 week')}/>
    <Button title='Wednesday' onPress={() => handleWeekPopup('This week')}/>
  </>
);
}


/** 
 * Month Popup layout 
 * 
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param changeMonth   - Changes the month to edit
 */
interface MonthButtonProps {
  togglePopup: (boolean) => void;
  changeMonth: (Month) => void;
}
const MonthButton: React.FC<MonthButtonProps> = ({togglePopup, changeMonth}) => {
  // Chooses day to change and closes day popup
  const handleMonthPopup = (m:Month) => {
    changeMonth(m);
    togglePopup(false);
  }
  return (
    <>
      <Button title='January' onPress={() => handleMonthPopup('Jan')}/>
      <Button title='February' onPress={() => handleMonthPopup('Feb')}/>
      <Button title='March' onPress={() => handleMonthPopup('Mar')}/>
      <Button title='April' onPress={() => handleMonthPopup('Apr')}/>
      <Button title='May' onPress={() => handleMonthPopup('May')}/>
      <Button title='June' onPress={() => handleMonthPopup('Jun')}/>
      <Button title='July' onPress={() => handleMonthPopup('Jul')}/>
      <Button title='August' onPress={() => handleMonthPopup('Aug')}/>
      <Button title='September' onPress={() => handleMonthPopup('Sep')}/>
      <Button title='October' onPress={() => handleMonthPopup('Oct')}/>
      <Button title='November' onPress={() => handleMonthPopup('Nov')}/>
      <Button title='December' onPress={() => handleMonthPopup('Dec')}/>
    </>
  );
}


/**
 * Renders a button to change graph data via popup
 * 
 * @param graphType  - [ @see GraphType ] 
 * @param graphData  - The graph to edit 
 * @param changeData - React hook to update graph
 * @param timeframe  - [ @see TimePeriod ] 
 */
interface EditGraphPopupProps {
  graphType: GraphType;
  graphData: GraphData|undefined;
  changeData: (GraphData) => void;
  timeframe: TimePeriod;
}
const EditGraphPopup: React.FC<EditGraphPopupProps> = ({graphType, graphData,
                                                        changeData, timeframe}) => {
  // Toggles popup windows
  const [popupVisible, setPopupVisible] = useState(false);
  const [timePopupVisible, setTimePopupVisible] = useState(false);
  // Toggles data change
  const [timeToEdit, setTimeToEdit] = useState(undefined);
  const [newData, setNewData] = useState('');
  
  // Converts GraphType to string
  const graphVar:string = (typeof graphType !== undefined) ? String(graphType) : 'Error';
  
  // Day/Month text formatting
  const writeTimeButtonText = () => {
    if (timeframe === 'Week')
      return (timeToEdit === undefined) ? 'Choose a Day' : dayString(timeToEdit);
    else if (timeframe === 'Month')
      return (timeToEdit === undefined) ? 'Choose a Week' : weekString(timeToEdit);
    else
      return (timeToEdit === undefined) ? 'Choose a Month' : monthString(timeToEdit);
  }

  // Updates the list to write new data
  const editData = () => {  
    if (timeToEdit !== undefined && graphData !== undefined) {
      let idx = graphData.labels.findIndex((t) => t === timeToEdit);
      let newDataAsNum = parseInt(newData);
      if (!isNaN(newDataAsNum)) {
        graphData.datasets[0].data[idx] = newDataAsNum;
        changeData(graphData);
      }
    }
    setPopupVisible(false);
  }

  // Renders the component
  return(
    <View key={1}>
      <Button title='Manually Update Data' onPress={() => setPopupVisible(true)}/>
      <Popup visible={popupVisible} togglePopup={setPopupVisible}>
        <View style={{padding:10, rowGap:20}}>
          <View style={{marginBottom:30}}>
            <Text style={styles.planPopupText}>{'Edit '+capitalize(graphVar)+' Data Point'}</Text>
          </View>
          <View style={{paddingVertical:5}}>
            <Text style={{fontSize:16}}>{capitalize(timeframe) + ' to Edit:'}</Text>
            <Button title={writeTimeButtonText()} onPress={() => setTimePopupVisible(true)}/>
            <Popup visible={timePopupVisible} togglePopup={setTimePopupVisible}>
              <Text style={[{marginBottom:30}, styles.planPopupText]}>Pick a Day:</Text>
              <View style={{gap:10}}>
                {(timeframe === 'Week') ? (
                  <DayButton 
                    changeDay={setTimeToEdit}
                    togglePopup={setTimePopupVisible}
                  />
                ) : (timeframe === 'Month') ? (
                  <WeekButton 
                    changeWeek={setTimeToEdit}
                    togglePopup={setTimePopupVisible}
                  />
                ) : (
                  <MonthButton 
                    changeMonth={setTimeToEdit}
                    togglePopup={setTimePopupVisible}
                  />
                )} 
              </View>
            </Popup>
          </View>
          <View>
            <Text style={{fontSize:16}}>New data:</Text>
            <TextBox
              placeholder='Enter updated data'
              value={newData}
              onChangeText={setNewData}
              field={'number-pad'}
              validate={ValidateNumber}
            />
          </View>
          <Button title='Sumbit Changes' onPress={editData}/>
        </View>
      </Popup>
    </View>
  );
}


/** Presents all graphs within a given time 
 * 
 * @param stepsTimeData       - The steps graph to edit 
 * @param setStepsTimeData    - React Hook to update steps graph
 * @param exerciseTimeData    - The exercise graph to edit 
 * @param setExerciseTimeData - React Hook to update exercise graph
 * @param weightTimeData      - The weight graph to edit 
 * @param setWeightTimeData   - React Hook to update weight graph
 * @param timeframe           - [ @see TimePeriod ] 
*/
interface GraphPageProps {
  stepsTimeData: GraphData;
  setStepsTimeData: (GraphData) => void;
  exerciseTimeData: GraphData;
  setExerciseTimeData: (GraphData) => void;
  weightTimeData: GraphData;
  setWeightTimeData: (GraphData) => void;
  timeframe: TimePeriod;
}
const GraphPage:React.FC<GraphPageProps> = ({stepsTimeData, setStepsTimeData,
                                             exerciseTimeData, setExerciseTimeData,
                                             weightTimeData, setWeightTimeData, timeframe}) => {
  return (
    <>
      <View style={{padding:20}}>
        <LineChartComponent data={stepsTimeData} title="Steps per Day" />
        <EditGraphPopup
          graphType='steps'
          graphData={stepsTimeData}
          timeframe={timeframe}
          changeData={setStepsTimeData}
        />
      </View>
      <View style={{padding:20}}>
        <LineChartComponent data={exerciseTimeData} title = "Exercise Minutes per Day" />
        <EditGraphPopup
          graphType='exercise'
          graphData={exerciseTimeData}
          timeframe={timeframe}
          changeData={setExerciseTimeData}
        />
      </View>
      <View style={{padding:20}}>
        <LineChartComponent data={weightTimeData} title="Weight per Day"  />
        <EditGraphPopup
          graphType='weight'
          graphData={weightTimeData}
          timeframe={timeframe}
          changeData={setWeightTimeData}
        />
      </View>
    </>
  )
}


/** Function to capitalize the first letter of a string */
const capitalize = (str:string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/** Hard coded data */
// Steps
const stepsWeekGraphData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [3000,1540,880,4430,3008,1000,2240] }]
}; 
const stepsMonthGraphData = {
  labels: ['3 weeks', '2 weeks', '1 week', 'This week'],
  datasets: [{ data: [2501,3102,4021,2754] }]
}
const stepsYearGraphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{ data: [4529,4419,3133,3572,4101,2333,3038,4678,2687,1479,4987,3021]}]
};

// Exercise
const exerciseWeekGraphData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [10,30,5,10,40,20,10] }]
};
const exerciseMonthGraphData = {
  labels: ['3 weeks', '2 weeks', '1 week', 'This week'],
  datasets: [{ data: [35,20,30,25] }]
}
const exerciseYearGraphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{ data: [40,40,35,30,20,25,30,40,50,60,45,30]}]
};

// Weight
const weightWeekGraphData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [130,131,132,131,129,129,130] }]
}
const weightMonthGraphData = {
  labels: ['3 weeks', '2 weeks', '1 week', 'This week'],
  datasets: [{ data: [120,125,132,130] }]
}
const weightYearGraphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{ data: [100,120,130,140,150,140,140,130,120,110,120,130]}]
};


export default function HomePage() {
  // Authentication
  const { loggedIn, authToken, updateUserData, userData } = useApiContext();
  
  // Steps from Apple Health
  const {steps,dailySteps} = useHealthData();
  console.log(steps);

  // Steps graph data
  const [stepsWeekData, setStepsWeekData] = useState<GraphData>(dailySteps ? dailySteps : stepsWeekGraphData);
  const [stepsMonthData, setStepsMonthData] = useState<GraphData>(stepsMonthGraphData);
  const [stepsYearData, setStepsYearData] = useState<GraphData>(stepsYearGraphData);
  // Weight graph data
  const [weightWeekData, setWeightWeekData] = useState<GraphData>(weightWeekGraphData);
  const [weightMonthData, setWeightMonthData] = useState<GraphData>(weightMonthGraphData);
  const [weightYearData, setWeightYearData] = useState<GraphData>(weightYearGraphData);
  // Step graph data
  const [exerciseWeekData, setExerciseWeekData] = useState<GraphData>(exerciseWeekGraphData);
  const [exerciseMonthData, setExerciseMonthData] = useState<GraphData>(exerciseMonthGraphData);
  const [exerciseYearData, setExerciseYearData] = useState<GraphData>(exerciseYearGraphData);

  // Determines data to pass through to pass through
  
  // Handles graph time range
  const timeOptions = ['Week', 'Month', 'Year'];
  const [selectedTime, setSelectedTime] = useState(0);
//timeOptions.lower
  // Changes time
  const handleTimeChange = (timeIndex) => {
    setSelectedTime(timeIndex);
  }

  // Redirects to a different page if incorrect
  if(!loggedIn) return <Redirect href={"/login"}/>
  if(userData?.firstLoggedin) return <Redirect href={"/submit_data"}/>

  // Render component
  return (
    <View style = {styles.heading}>
      <View style = {[styles.header, ]}>
      <Text style = {styles.headerText} >Hello, {userData?.username ? userData.username : "USER"}</Text>
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
        {(selectedTime === 0) ? (
          <GraphPage
            stepsTimeData={stepsWeekData}       setStepsTimeData={setStepsWeekData}
            exerciseTimeData={exerciseWeekData} setExerciseTimeData={setExerciseWeekData}
            weightTimeData={weightWeekData}     setWeightTimeData={setWeightWeekData}
            timeframe='Week'
          />
        ) : (selectedTime === 1) ? (
          <GraphPage
            stepsTimeData={stepsMonthData}       setStepsTimeData={setStepsMonthData}
            exerciseTimeData={exerciseMonthData} setExerciseTimeData={setExerciseMonthData}
            weightTimeData={weightMonthData}     setWeightTimeData={setWeightMonthData}
            timeframe='Month'
          />
        ) : (
          <GraphPage
            stepsTimeData={stepsYearData}       setStepsTimeData={setStepsYearData}
            exerciseTimeData={exerciseYearData} setExerciseTimeData={setExerciseYearData}
            weightTimeData={weightYearData}     setWeightTimeData={setWeightYearData}
            timeframe='Year'
          />
        )}     
      </ScrollView>
    </View>
  );
}