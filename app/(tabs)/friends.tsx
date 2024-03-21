import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function FriendsPage() {
    return (
        <View style={defaultPageTheme().container}>
            <Image 
                source={require('../../assets/humiliation.jpg')} 
                style={{width: 200, height: 200}}
            />
            <Text>You have no friends</Text>
            <Button
                onPress={() => {router.replace('/');}}
                title="Go Home"
            />
            <StatusBar style="auto"/>
        </View>
    );
}