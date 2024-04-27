import { useState } from "react";
import AppleHealthKit, { HealthKitPermissions, HealthStatusCode } from "react-native-health"


/** Our personal health kit */
//var healthStore : 

/** Determines if FitHub can read from Apple Health */
const [hasPermissions, setHasPermissions] = useState(false);
//const [authStatus, setAuthStatus] = useState<any>({});

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.BloodType,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.Weight
    ],
    write: []
  }
}

//Object.assign
export function HKInit() : string | undefined {
  var initErrorMessage : string = '';
  AppleHealthKit.initHealthKit(permissions, (err) => {
    if (err) {
      initErrorMessage = "Error initializing Health Kit: " + err;
      console.log(initErrorMessage);
      return;
    }
    setHasPermissions(true);
  });
  return initErrorMessage !== '' ? initErrorMessage : undefined;
}


export function getPermissions(){
  return hasPermissions;
}

AppleHealthKit.getAuthStatus
//AppleHealthKit.isAvailable