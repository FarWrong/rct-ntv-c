import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, Modal, Alert, TextInput } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { UserType , getUserInfo, setUserInfo} from '../../api/User';
import { Ionicons } from '@expo/vector-icons';



export default function ProfilePage() {
    const {authToken,updateUserData,userData} = useApiContext();
    console.log(authToken)
    const [UsernamemodalVisible, setUsernameModalVisible] = useState(false);
    const [EmailmodalVisible, setEmailModalVisible] = useState(false);
    const [AgemodalVisible, setAgeModalVisible] = useState(false);
    const [WeightmodalVisible, setWeightModalVisible] = useState(false);
    const [HeightmodalVisible, setHeightModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [newHeight, setNewHeight] = useState('');

    
    const handleUsernameUpdate = async () => {
      try {
          const updatedUserData = { ...userData, username: newUsername };
          const response = await setUserInfo(authToken, updatedUserData);
          console.log(response)
          if (response === "success!") {
              // Update user data displayed on the profile page
              updateUserData();
              setUsernameModalVisible(false);
          } else {
              console.log(newUsername)
              console.error('Failed to update username');
              // Handle error
          }
      } catch (error) {
          console.error('Error updating username:', error);
          // Handle error
      }
  };


  const handleEmailUpdate = async () => {
    try {
        const updatedUserData = { ...userData, email: newEmail };
        const response = await setUserInfo(authToken, updatedUserData);
        console.log(response)
        if (response === "success!") {
            // Update user data displayed on the profile page
            updateUserData();
            setEmailModalVisible(false);
        } else {
          
            console.error('Failed to update email');
            // Handle error
        }
    } catch (error) {
        console.error('Error updating email:', error);
        // Handle error
    }
};

const handleAgeUpdate = async () => {
    try {
        const updatedUserData = { ...userData, age: parseInt(newAge, 10) };
        const response = await setUserInfo(authToken, updatedUserData);
        console.log(response)
        if (response === "success!") {
            // Update user data displayed on the profile page
            updateUserData();
            setAgeModalVisible(false);
        } else {
            console.log(newAge)
            console.error('Failed to update age');
            // Handle error
        }
    } catch (error) {
        console.error('Error updating age:', error);
        // Handle error
    }
};
const handleWeightUpdate = async () => {
    try {
        const updatedUserData = { ...userData, weight: parseInt(newWeight, 10) };
        const response = await setUserInfo(authToken, updatedUserData);
        console.log(response)
        if (response === "success!") {
            // Update user data displayed on the profile page
            updateUserData();
            setWeightModalVisible(false);
        } else {
            console.log(newWeight)
            console.error('Failed to update weight');
            // Handle error
        }
    } catch (error) {
        console.error('Error updating weight:', error);
        // Handle error
    }
};

const handleHeightUpdate = async () => {
    try {
        const updatedUserData = { ...userData, height: parseInt(newHeight, 10) };
        const response = await setUserInfo(authToken, updatedUserData);
        console.log(response)
        if (response === "success!") {
            // Update user data displayed on the profile page
            updateUserData();
            setHeightModalVisible(false);
        } else {
            console.log(newHeight)
            console.error('Failed to update height');
            // Handle error
        }
    } catch (error) {
        console.error('Error updating height:', error);
        // Handle error
    }
};


    useEffect(() => {
        const fetchData = async () => {
          try {
            const userInfo = await updateUserData();
            if (userInfo) {
              console.log("what")
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
              <View style = {styles.row}>
                  <Text style = {styles.text}>Username</Text>
                  <TouchableOpacity onPress= {() => setUsernameModalVisible(true)}>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                 {userData.username?.toString() || 'NA'}
              </Text>
              <Modal
                        animationType="fade"
                        transparent={true}
                        visible={UsernamemodalVisible}
                        onRequestClose={() => setUsernameModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewUsername}
                                    value={newUsername}
                                    placeholder="Enter new username"
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={handleUsernameUpdate}>
                                  <View style = {styles.settingsbutton}>
                                    <Text style={[styles.settingsbuttonText, { fontWeight: 'bold' }]}>Update</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setUsernameModalVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> {/* Close icon */}
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
     
              
            <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Email</Text>
                  <TouchableOpacity onPress= {() => setEmailModalVisible(true)}>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  {userData.email?.toString() || 'NA'}
              </Text>

              <Modal
                        animationType="fade"
                        transparent={true}
                        visible={EmailmodalVisible}
                        onRequestClose={() => setEmailModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewEmail}
                                    value={newEmail}
                                    placeholder="Enter new email"
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={handleEmailUpdate}>
                                  <View style = {styles.settingsbutton}>
                                    <Text style={[styles.settingsbuttonText, { fontWeight: 'bold' }]}>Update</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setEmailModalVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> {/* Close icon */}
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

              
              
               

              

              <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Age</Text>
                  <TouchableOpacity onPress= {() => setAgeModalVisible(true)}>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  {userData.age?.toString() || 'NA'}
                </Text>

                <Modal
                        animationType="fade"
                        transparent={true}
                        visible={AgemodalVisible}
                        onRequestClose={() => setAgeModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewAge}
                                    value={newAge}
                                    placeholder="Enter new age"
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={handleAgeUpdate}>
                                  <View style = {styles.settingsbutton}>
                                    <Text style={[styles.settingsbuttonText, { fontWeight: 'bold' }]}>Update</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setAgeModalVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> {/* Close icon */}
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

            <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Weight</Text>
                  <TouchableOpacity onPress= {() => setWeightModalVisible(true)}>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  {userData.weight?.toString() || ''}
              </Text>

              <Modal
                        animationType="fade"
                        transparent={true}
                        visible={WeightmodalVisible}
                        onRequestClose={() => setWeightModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewWeight}
                                    value={newWeight}
                                    placeholder="Enter new weight"
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={handleWeightUpdate}>
                                  <View style = {styles.settingsbutton}>
                                    <Text style={[styles.settingsbuttonText, { fontWeight: 'bold' }]}>Update</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setWeightModalVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> {/* Close icon */}
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


            <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Height</Text>
                  <TouchableOpacity onPress= {() => setHeightModalVisible(true)}>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View> 
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                {userData?.height?.toString() || 'NA'}
              </Text>
              <Modal
                        animationType="fade"
                        transparent={true}
                        visible={HeightmodalVisible}
                        onRequestClose={() => setHeightModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewHeight}
                                    value={newHeight}
                                    placeholder="Enter new height"
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={handleHeightUpdate}>
                                  <View style = {styles.settingsbutton}>
                                    <Text style={[styles.settingsbuttonText, { fontWeight: 'bold' }]}>Update</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setWeightModalVisible(false)} style={styles.closeButton}>
                                  <Ionicons name="close" size={20}  /> {/* Close icon */}
                                  </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>



          </View>
      </ScrollView>
    </View>

  )
}