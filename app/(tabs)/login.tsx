import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Image, Text, View } from 'react-native';

import { defaultPageTheme } from '../utility/style';
import { TextBox } from '../components/textbox';
import { Button } from '../components/button';


export default function Page() {
    return (
        <View style={defaultPageTheme().container}>
            <Image
                source={require('../../assets/icon.png')}
                style={{ width: 100, height: 100 }}
            />
            <TextBox title="Username" />
            <TextBox title="Password" />
            <Button
                onPress={() => { router.replace('/'); }}
                title="Make Account"
            />
            <StatusBar style="auto" />
        </View>
    )
}
