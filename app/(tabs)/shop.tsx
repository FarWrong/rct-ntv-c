import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme } from '../utility/style';


export default function ShopPage() {
    return (
        <View style={defaultPageTheme().container}>
            <Image 
                source={require('../../assets/shopping.jpg')} 
                style={{width: 200, height: 200}}
            />
            <Text>We have nothing for sale now! Please check back later!</Text>
            <Button
                onPress={() => {router.replace('/');}}
                title="Go Home"
            />
            <StatusBar style="auto"/>
        </View>
    );
}