import React, { useState } from 'react';
import { KeyboardTypeOptions, Modal, StyleProp, Text, TextInput, ViewStyle, View } from 'react-native';
import {styles} from '../utility/style';

import { useTheme } from '../utility/ThemeContext';
//import use

/**
 * The textbox component creates textboxes that take in text input
 * 
 * @param {string} placeholder - Text input when there is no text input
 * @param {string} value - Variable to pass input text to
 * @param {function()} onChangeText - Function to run when text is changed
 * @param {boolean} secure - Check if the text field should be secure
 * @param {StyleProp} style - Allow custom styles to be passed
 * @param {KeyboardTypeOptions} field - Determines the keyboard used for the input
 * @param {function()} validate - A function used to validate the input
 */
interface TextboxProps {
    placeholder: string;
    value: string;
    onChangeText: (string) => void;
    field?: KeyboardTypeOptions;
    secure?: boolean;
    validate?: (string) => string;
    style?: StyleProp<ViewStyle>;
}

export const TextBox: React.FC<TextboxProps> = ({ placeholder, value,
                                                  onChangeText, field,
                                                  secure, validate, style }) => {
    const { theme } = useTheme();
    // Controls highlighted box feature
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => { setFocus(!focus) }
    // Controls error functionality
    const [error, setError] = useState('');
    // Controls keyboard
    const keyboard = (typeof field !== undefined) ? field : "default";

    const handleUpdateText = (val) => {
        if (validate !== undefined) setError(validate(val));
        onChangeText(val);
    }

    return (
        <View style={{
            alignItems:'center', 
            flexDirection: 'row', 
            width:600, 
            margin:5,
            justifyContent:'space-evenly',
        }}>
            <View style={{flex:1, padding: 12}}/>
            <View style={{flex:1, padding: 12, justifyContent: 'center'}}>
                <TextInput
                    onFocus={toggleFocus} // Become primary color
                    onBlur={toggleFocus} // Become secondary color
                    keyboardType={keyboard}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={v => handleUpdateText(v)}
                    secureTextEntry={secure}
                    style={[{
                        borderColor: (focus ? theme.colors.primary
                            : theme.colors.secondary),
                        borderWidth: theme.textBox.borderWidth,
                        gap: theme.textBox.gap,
                        height: theme.textBox.height,
                        paddingHorizontal: theme.textBox.paddingHorizontal,
                    }, style]}
                />
            </View>
            {error ? (
                <View style={{
                    flex:1,
                    backgroundColor: '#ffffff',
                    //alignSelf: 'flex-end',
                    padding: 12,
                    borderRadius: 5,
                }}>
                    <Text style={{flexWrap:'wrap', fontSize:10}}>{error}</Text>
                </View>
            ) : (<View style={{flex:1, padding: 12}}/>)}
        </View>
    )
}