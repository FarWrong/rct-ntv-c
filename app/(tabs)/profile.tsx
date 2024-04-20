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
const {authToken, updateUserData, userData} = useApiContext();


/** Helper function that automatically updates the user information */
async function handleUpdate(dataType: ProfileType, togglePopup, value) {
  var updatedUserData: UserType|null;

  if (dataType === 'username') updatedUserData = {...userData, username: value};
  else if (dataType === 'email') updatedUserData = {...userData, email: value};
  else if (dataType === 'age') updatedUserData = {...userData, age: value};
  else if (dataType === 'weight') updatedUserData = {...userData, weight: value};
  else if (dataType === 'height') updatedUserData = {...userData, height: value};
  else updatedUserData = {...userData};
  
  try {
    const response = await setUserInfo(authToken, updatedUserData);
    console.log(response);
    if (response === "success!") {
      // Update user data displayed on the profile page
      updateUserData();
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
  togglePopup: (boolean) => void;
  visible: boolean;
  updateValue: (string) => void;
  value: string;
}

const EditDataField: React.FC<EditDataFieldProps> = ({ dataType, togglePopup, visible,
                                                       updateValue, value }) => {
  const dataText = (dataType !== undefined) ? dataType.toUpperCase() : "Error";
  var dataVar: string|undefined;

  if (dataType === 'username') dataVar = userData?.username?.toString();
  else if (dataType === 'email') dataVar = userData?.email?.toString();
  else if (dataType === 'age') dataVar = userData?.age?.toString();
  else if (dataType === 'weight') dataVar = userData?.weight?.toString();
  else if (dataType === 'height') dataVar = userData?.height?.toString();
  else dataVar = "Error";

  return (
    <View>
      <View style = {styles.row}>
        <Text style = {styles.text}>{dataText}</Text>
        <TouchableOpacity onPress= {() => togglePopup(true)}>
          <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
        {dataVar || 'NA'}
      </Text>
      
      <Popup
        visible={visible}
        togglePopup={togglePopup}
      >
        <TextBox
          placeholder={"Enter new " + dataType}
          value={value}
          onChangeText={updateValue}
        />
        <Button
          title={"Update"}
          onPress={() => handleUpdate(dataType, togglePopup, value)}
        />
      </Popup>
    </View>
  )
}




export default function ProfilePage() {
  console.log(authToken)
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await updateUserData();
        if (userInfo) {
          console.log("what");
          console.log(userData); // Logging userData onto the console
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchData();
  }, [authToken]);

  
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
              togglePopup = {setUsernameModalVisible}
              visible = {usernameModalVisible}
              updateValue = {setNewUsername}
              value = {newUsername}
            />
            <EditDataField
              dataType = 'email'
              togglePopup = {setEmailModalVisible}
              visible = {emailModalVisible}
              updateValue = {setNewEmail}
              value = {newEmail}
            />
            
            <View style = {styles.row}>
              <Text style = {styles.text}>Privacy</Text>
            </View>
            <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                CURRENT SETTINGS
            </Text>

            <EditDataField
              dataType = 'age'
              togglePopup = {setAgeModalVisible}
              visible = {ageModalVisible}
              updateValue = {setNewAge}
              value = {newAge}
            />
            <EditDataField
              dataType = 'weight'
              togglePopup = {setWeightModalVisible}
              visible = {weightModalVisible}
              updateValue = {setNewWeight}
              value = {newWeight}
            />
            <EditDataField
              dataType = 'height'
              togglePopup = {setHeightModalVisible}
              visible = {heightModalVisible}
              updateValue = {setNewHeight}
              value = {newHeight}
            />
          </View>
      </ScrollView>
    </View>
  )
}