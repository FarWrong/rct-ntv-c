import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";

const { Permissions } = AppleHealthKit.Constants;

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      Permissions.Steps,
      Permissions.FlightsClimbed,
      Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

export interface step_day{
  day_of_week:string,
  steps:number
}


export interface simpleData{
  data:number[]
}

export interface GraphData
{
  labels: string[]
  datasets: simpleData[]
};


const useHealthData = () => {
  const [steps, setSteps] = useState(0);
  const [dailySteps, setdailySteps] = useState<GraphData  | undefined>();
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

	// HealthKit implementation
  const [hasPermissions, setHasPermission] = useState(false);
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }
  
    // Query Health data
    const options: HealthInputOptions = {
      date: new Date().toISOString(),
    };
    
    AppleHealthKit.getStepCount(options, (err, results) => {
      const today = new Date();
      const lastSevenDays = new Date(today);
      lastSevenDays.setDate(lastSevenDays.getDate() - 6);

      const stepOptions = {
        startDate: lastSevenDays.toISOString(),
      };

      if (err) {
        console.log('Error getting the steps');
        return;
      }
   
      console.log(results.value);
      AppleHealthKit.getDailyStepCountSamples(stepOptions, (err, results) => {
        if (err) {
          return;
        }

        let labels:string[] = [];
        let stepcounts:number[] = [];
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (let i = 0; i < 7; i++) {
          const date = new Date(lastSevenDays);
          date.setDate(date.getDate() + i);
          const day = dayOfWeek[date.getDay()];

          const stepCount = results.find((result) => {
            const resultDate = new Date(result.startDate);
            return resultDate.getDate() === date.getDate();
          });

          labels.push(day);
          stepcounts.push(stepCount? stepCount.value : 0);
        }
        let res_data = {
          labels: labels,
          datasets: [
            {data: stepcounts,
            },
          ],
        };

          setdailySteps(res_data);
      });

      
      setSteps(results.value);
    });
  }, [hasPermissions]);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }
    
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log('Error getting permissions');
        return;
      }
      setHasPermission(true);
    });
  }, []);

  return { steps, flights, distance,dailySteps };
};

export default useHealthData;