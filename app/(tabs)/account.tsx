import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { useApiContext } from '../../api/ApiContext';
import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function AccountPage() {
    const { signoutUser } = useApiContext();
    return (
        <View style={defaultPageTheme().container}>
            <Image
                source={require('../../assets/fatcat.jpg')}
                style={{ width: 190, height: 190 }}
            />
            <Button
                onPress={() => { router.replace('/'); }}
                title="Go Home"
            />
            <Button 
                onPress={()=>{signoutUser();}}
                title="Signout"
            />
            <StatusBar style="auto" />
        </View>
    );
}