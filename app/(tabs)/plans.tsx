import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function PlansPage() {
    return (
        <View style={defaultPageTheme().container}>
            <Image
                source={require('../../assets/list.jpg')}
                style={{width: 200, height: 200}}
            />
            <Button 
                title="Browse Plans"
            />
            <Button
                onPress={() => {router.replace('/');}}
                title="Go Home"
            />
            <StatusBar style="auto"/>
        </View>
    );
}