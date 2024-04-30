import { Redirect } from 'expo-router';
import React, { useState } from 'react';
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
    <View style={styles.chartContainer}>
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
type TimePeriod = 'day' | 'month';
/** Determines the day of the week */
type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | undefined;
/** Determines the month of the year */
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
 * Month Popup layout 
 * 
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param changeMonth   - Changes the month to edit
 */
interface MonthButtonProps {
  togglePopup: (boolean) => void;
  changeMonth: (Month) => void;
}

/** Month Popup layout */
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
 * @param graphType  - The type of graph we're updating [ @see GraphType ] 
 * @param graphData  - The graph data to edit 
 * @param timeframe  - The time period the graph is referencing [ @see TimePeriod ] 
 * @param changeData - React hook to update data
 */
interface EditGraphPopupProps {
  graphType: GraphType;
  graphData: GraphData|undefined;
  timeframe: TimePeriod;
  changeData: (GraphData) => void;
}

const EditGraphPopup: React.FC<EditGraphPopupProps> = ({graphType, graphData,
                                                        timeframe, changeData}) => {
  // Toggles popup windows
  const [popupVisible, setPopupVisible] = useState(false);
  const [timePopupVisible, setTimePopupVisible] = useState(false);
  // Toggles data change
  const [timeToEdit, setTimeToEdit] = useState(undefined);
  const [newData, setNewData] = useState('');
  
  // Converts GraphType to string
  const graphVar:string = (typeof graphType !== undefined) ? String(graphType) : 'Error';
  
  // Day/Month text formatting
  const writeDayButtonText = () => {
    if (timeframe === 'month')
      return (timeToEdit === undefined) ? 'Choose a Month' : monthString(timeToEdit);
    else
      return (timeToEdit === undefined) ? 'Choose a Day' : dayString(timeToEdit);
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
    <>
      <Button title='Manually Update Data' onPress={() => setPopupVisible(true)}/>
      <Popup visible={popupVisible} togglePopup={setPopupVisible}>
        <View style={{padding:10, rowGap:20}}>
          <View style={{marginBottom:30}}>
            <Text style={styles.planPopupText}>{'Edit '+capitalize(graphVar)+' Data Point'}</Text>
          </View>
          <View style={{paddingVertical:5}}>
            <Text style={{fontSize:16}}>{capitalize(timeframe) + ' to Edit:'}</Text>
            <Button title={writeDayButtonText()} onPress={() => setTimePopupVisible(true)}/>
            <Popup visible={timePopupVisible} togglePopup={setTimePopupVisible}>
              <Text style={[{marginBottom:30}, styles.planPopupText]}>Pick a Day:</Text>
              <View style={{gap:10}}>
                {timeframe === 'month' ? (
                  <MonthButton 
                    changeMonth={setTimeToEdit}
                    togglePopup={setTimePopupVisible}
                  />
                ) : (
                  <DayButton 
                    changeDay={setTimeToEdit}
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
              field='number-pad'
              validate={ValidateNumber}
            />
          </View>
          <Button title='Sumbit Changes' onPress={editData}/>
        </View>
      </Popup>
    </>
  );
}


/** Function to capitalize the first letter of a string */
const capitalize = (str:string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/** Hard coded data */
const weightGraphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{ data: [100,120,130,140,150,140,140,130,120,110,120,130]}]
};

const exerciseGraphData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [10,30,5,10,40,20,10] }]
};

const stepsGraphDataLastWeek = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [3000,1540,880,4430,3008,1000,2240] }]
}; 

const exerciseGraphDataLastWeek = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [20,40,10,5,50,10,20] }]
};


/** */
export default function HomePage() {
  // Authentication
  const { loggedIn, authToken, updateUserData, userData } = useApiContext();

  // Graph data
  const [stepsDataLastWeek, setStepsDataLastWeek] = useState<GraphData>(stepsGraphDataLastWeek);
  const [exerciseDataLastWeek, setExerciseDataLastWeek] = useState<GraphData>(exerciseGraphDataLastWeek);
  const [exerciseData, setExerciseData] = useState<GraphData>(exerciseGraphData);
  const [weightData, setWeightData] = useState<GraphData>(weightGraphData);

  // Steps
  const {steps,dailySteps} = useHealthData();
  console.log(steps);
  
  // Handles graph time range
  const timeOptions = ['D', 'W', 'M', 'Y'];
  const [selectedTime, setSelectedTime] = useState(0);
  const handleTimeChange = (timeIndex) => {
    setSelectedTime(timeIndex);
  }

  // Redirects to a different page if incorrect
  if(!loggedIn) return <Redirect href={"/login"}/>
  if(userData?.firstLoggedin) return <Redirect href={"/submit_data"}/>

  // Render component
  return (
    <View style = {styles.heading}>
      <View style = {styles.header}>
        <Text style = {styles.headerText}>Hello, USER!</Text>
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
            <View style={{padding:20}}>
              <LineChartComponent data={stepsDataLastWeek} title="Steps" />
              <EditGraphPopup
                graphType='steps'
                graphData={stepsDataLastWeek}
                timeframe={'day'}
                changeData={setStepsDataLastWeek}
              />
            </View>
            <View style={{padding:20}}>
              <LineChartComponent data={exerciseData} title = "Exercise Minutes" />
              <EditGraphPopup
                graphType='exercise'
                graphData={exerciseData}
                timeframe={'day'}
                changeData={setExerciseData}
              />
            </View>
            <View style={{padding:20}}>
              <LineChartComponent data={weightData} title="Weight"  />
              <EditGraphPopup
                graphType='weight'
                graphData={weightData}
                timeframe={'month'}
                changeData={setWeightData}
              />
            </View>
          </>
        ) : (
          <>
            <LineChartComponent data={dailySteps ? dailySteps:stepsDataLastWeek} title="Steps" />
            <LineChartComponent data={exerciseDataLastWeek} title = "Exercise Minutes" />
            <LineChartComponent data={weightData} title="Weight"  />
          </>
        )}     
      </ScrollView>
    </View>
  );
}