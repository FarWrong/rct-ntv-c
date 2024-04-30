import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { UserType , getUserInfo, setUserInfo} from '../../api/User';
import { TextBox } from '../components/textbox';
import { Popup } from '../components/popup';


/** Custom type for data to update */
type ProfileType = 'username' | 'email' | 'age' | 'weight' | 'height' | undefined;
/** Detemines API token to connect with the database */

/** Helper function that automatically updates the user information */
async function handleUpdate(request: UserAPIRequest, dataType: ProfileType,
                            togglePopup: (boolean) => void, value) {
  var updatedUserData: UserType|null;
  const token = request.authToken;
  const data = request.userData;
  const update = request.updateUserData;

  if (dataType === 'username') updatedUserData = {...data, username: value};
  else if (dataType === 'email') updatedUserData = {...data, email: value};
  else if (dataType === 'age') updatedUserData = {...data, age: value};
  else if (dataType === 'weight') updatedUserData = {...data, weight: value};
  else if (dataType === 'height') updatedUserData = {...data, height: value};
  else updatedUserData = {...data};
  
  try {
    const response = await setUserInfo(token, updatedUserData);
    console.log(response);
    if (response === "success!") {
      // Update user data displayed on the profile page
      update();
      togglePopup(false);
    } else {
      console.log(value);
      console.error('Failed to update user data');
      // Handle error
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    // Handle error
  }
}


/** Keeps user request in a single object */
interface UserAPIRequest {
  authToken: string;
  updateUserData: () => Promise<String|null>;
  userData: UserType | null;
}

/**
 * Custom component to update user data via a popup component
 * 
 * @param dataType    - The current data we are changing
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param visible     - Whether or not the current popup is visible
 * @param updateValue - Updates the current value stored in the UserType
 * @param value       - Variable to pass input text to
 */
interface EditDataFieldProps {
  dataType: ProfileType;
  updateValue: (string) => void;
  value: string;
  request: UserAPIRequest;
}

const EditDataField: React.FC<EditDataFieldProps> = ({ dataType, updateValue,
                                                       value, request }) => {                               
  // Determines whether to enable popup or not
  const [popupVisible, setPopupVisible] = useState(false);

  const dataText = (dataType !== undefined) ? dataType.toUpperCase() : "Error";
  
  var dataVar: string|undefined;
  const data = request.userData;

  if (dataType === 'username') dataVar = data?.username?.toString();
  else if (dataType === 'email') dataVar = data?.email?.toString();
  else if (dataType === 'age') dataVar = data?.age?.toString();
  else if (dataType === 'weight') dataVar = data?.weight?.toString();
  else if (dataType === 'height') dataVar = data?.height?.toString();
  else dataVar = "Error";

  return (
    <View>
      <View style = {styles.row}>
        <Text style = {styles.text}>{dataText}</Text>
        <TouchableOpacity onPress= {() => setPopupVisible(true)}>
          <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
        {dataVar || 'NA'}
      </Text>
      
      <Popup
        visible={popupVisible}
        togglePopup={setPopupVisible}
      >
        <TextBox
          placeholder={"Enter new " + dataType}
          value={value}
          onChangeText={updateValue}
        />
        <Button
          title={"Update"}
          onPress={() => handleUpdate(request, dataType, setPopupVisible, value)}
        />
      </Popup>
    </View>
  )
}




export default function ProfilePage() {
  const request : UserAPIRequest = useApiContext();

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await request.updateUserData();
        if (userInfo) {
          console.log("what");
          console.log(request.userData); // Logging userData onto the console
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchData();
  }, [request.authToken]);

  
  return (
    <View style = {styles.heading}>
      <View style = {styles.header}>
        <Text style = {styles.headerText}>Profile Settings</Text>
        <TouchableOpacity>
          <Image source={require('assets/pfp.png')} style={styles.avatar}/>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style = {styles.content}>
          <EditDataField
            dataType = 'username'
            updateValue = {setNewUsername}
            value = {newUsername}
            request={request}
          />
          <EditDataField
            dataType = 'email'
            updateValue = {setNewEmail}
            value = {newEmail}
            request={request}
          />
            
          <View style = {styles.row}>
            <Text style = {styles.text}>Privacy</Text>
          </View>
          <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
              CURRENT SETTINGS
          </Text>

          <EditDataField
            dataType = 'age'
            updateValue = {setNewAge}
            value = {newAge}
            request={request}
          />
          <EditDataField
            dataType = 'weight'
            updateValue = {setNewWeight}
            value = {newWeight}
            request={request}
          />
          <EditDataField
            dataType = 'height'
            updateValue = {setNewHeight}
            value = {newHeight}
            request={request}
          />
        </View>
      </ScrollView>
    </View>
  )
}