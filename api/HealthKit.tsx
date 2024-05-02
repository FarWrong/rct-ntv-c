import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
  HealthValue,
} from "react-native-health";

const { Permissions } = AppleHealthKit.Constants;

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      Permissions.BloodType,
      Permissions.Weight,
      Permissions.HeartRate,
      Permissions.HeartRateVariability,
      Permissions.HeartbeatSeries,
      Permissions.Height,
      Permissions.Steps,
      Permissions.FlightsClimbed,
      Permissions.Electrocardiogram,
      Permissions.DistanceWalkingRunning,
      Permissions.WalkingHeartRateAverage,
    ],
    write: [],
  },
};

/** Steps taken for a given day */
export interface StepDay{
  day_of_week:string,
  steps:number
}

/** Bullet points for a graph */
export interface SimpleData {
  data:number[]
}

/** Data for graph */
export interface GraphData {
  labels: string[]
  datasets: SimpleData[]
};

export const getAverageHeartRate = (startDate: Date): Promise<number> => {
  return new Promise((resolve, reject) => {
    const twoMinutesBeforeStartDate = new Date(startDate.getTime() - 2 * 60 * 1000);

    const options: HealthInputOptions = {
      startDate: twoMinutesBeforeStartDate.toISOString(),
    };
    try{
    AppleHealthKit.getHeartRateSamples(options, (err, results:Array<HealthValue>) => {
      if (err) {
        console.log('Error getting heart rate samples');
        resolve(0);
      }
      console.log("HERE DEM REAL",results);
      if (results.length > 0) {
        const totalHeartRate = results.reduce((sum, sample) => sum + sample.value, 0);
        const averageHeartRate = totalHeartRate / results.length;
        resolve(averageHeartRate);
      } else {
        resolve(0);
      }
    });
   }catch{
    resolve(0);
   }
  });
  
};

const useHealthData = () => {
  const [steps, setSteps] = useState(0);
  const [dailySteps, setDailySteps] = useState<GraphData|undefined>();
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
      lastSevenDays.setDate(lastSevenDays.getDate() - 30);

      const stepOptions = {
        startDate: lastSevenDays.toISOString(),
      };

      if (err) {
        console.log('Error getting the steps');
        return;
      }
   
      console.log("STEPS",results.value);
      AppleHealthKit.getDailyStepCountSamples(stepOptions, (err, results) => {
        if (err) {
          return;
        }

        let labels:string[] = [];
        let stepcounts:number[] = [];
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (let i = 0; i < 31; i++) {
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
          datasets: [{data: stepcounts}]
        };

        setDailySteps(res_data);
        console.log(res_data)
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

  return { steps, flights, distance, dailySteps };
};

export default useHealthData;