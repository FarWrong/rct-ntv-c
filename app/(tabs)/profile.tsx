import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { UserType , getUserInfo, setUserInfo} from '../../api/User';
import { TextBox } from '../components/textbox';
import { Popup } from '../components/popup';
import * as form from '../utility/formValidation';


/** Custom type for data to update */
type ProfileType = 'username' | 'email' | 'age' | 'weight' | 'height' | undefined;

interface APIRequest {
  authToken
  updateUserData
  userData
}

/** Helper function that automatically updates the user information */
async function handleUpdate(dataType: ProfileType, togglePopup, value, validate, API: APIRequest) {
  var updatedUserData: UserType;
  if (validate(value) === '') { 
    if (dataType === 'username') updatedUserData = {...API.userData, username: value};
    else if (dataType === 'email') updatedUserData = {...API.userData, email: value};
    else if (dataType === 'age') updatedUserData = {...API.userData, age: value};
    else if (dataType === 'weight') updatedUserData = {...API.userData, weight: value};
    else if (dataType === 'height') updatedUserData = {...API.userData, height: value};
    else updatedUserData = {...API.userData};

    try {
      const response = await setUserInfo(API.authToken, updatedUserData);
      console.log(response);
      if (response === "success!") {
        // Update user data displayed on the profile page
        API.updateUserData();
        togglePopup(false);
        return;
      } else {
        console.log(value);
        console.error('Failed to update user data');
        // Handle error
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error
    }

    return;
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
  API: APIRequest;
  validate?: (string) => string;
}

const EditDataField: React.FC<EditDataFieldProps> = ({ dataType, togglePopup, visible,
                                                       updateValue, value, API, validate }) => {
  var dataText = (dataType !== undefined) ? dataType.toUpperCase() : "Error";
  if (dataText === 'Weight') dataText += ' (lbs)';
  else if (dataText === 'Height') dataText += ' (in)';
  
  var dataVar: string|undefined;
  if (dataType === 'username') dataVar = API.userData?.username?.toString();
  else if (dataType === 'email') dataVar = API.userData?.email?.toString();
  else if (dataType === 'age') dataVar = API.userData?.age?.toString();
  else if (dataType === 'weight') dataVar = API.userData?.weight?.toString();
  else if (dataType === 'height') dataVar = API.userData?.height?.toString();
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
          validate={validate}
        />
        <Button
          title={"Update"}
          style={{/*maxWidth:Dimensions.get('window').width*.75,*/ alignSelf:'center'}}
          onPress={() => handleUpdate(dataType, togglePopup, value, validate, API)}
        />
      </Popup>
    </View>
  )
}


export default function ProfilePage() {
  /** Detemines API token to connect with the database */
  const {authToken, updateUserData, userData} = useApiContext();
  var API = {authToken, updateUserData, userData};
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
      <View style = {[styles.header, ]}>
        <Text style = {styles.headerText} >Profile Settings</Text>
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
            API = {API}
            validate={form.ValidateUser}
          />
          <EditDataField
            dataType = 'email'
            togglePopup = {setEmailModalVisible}
            visible = {emailModalVisible}
            updateValue = {setNewEmail}
            value = {newEmail}
            API = {API}
            validate={form.ValidateEmail}
          />
          <EditDataField
            dataType = 'age'
            togglePopup = {setAgeModalVisible}
            visible = {ageModalVisible}
            updateValue = {setNewAge}
            value = {newAge}
            API = {API}
            validate={form.ValidateNumber}
          />
          <EditDataField
            dataType = 'weight'
            togglePopup = {setWeightModalVisible}
            visible = {weightModalVisible}
            updateValue = {setNewWeight}
            value = {newWeight}
            API = {API}
            validate={form.ValidateNumber}
          />
          <EditDataField
            dataType = 'height'
            togglePopup = {setHeightModalVisible}
            visible = {heightModalVisible}
            updateValue = {setNewHeight}
            value = {newHeight}
            API = {API}
            validate={form.ValidateNumber}
          />
        </View>
      </ScrollView>
    </View>
  )
}