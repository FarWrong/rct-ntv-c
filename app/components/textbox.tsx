import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleProp, Text, TextInput, ViewStyle, View } from 'react-native';

import { styles } from '../utility/style';
import { useTheme } from '../utility/ThemeContext';



/**
 * The textbox component creates textboxes that take in text input
 * 
 * @param placeholder  - Text input when there is no text input
 * @param value        - Variable to pass input text to
 * @param onChangeText - Function to run when text is changed
 * @param field        - Determines the keyboard used for the input
 * @param validate     - A function used to validate the input
 * @param style        - Allows custom styles to be passed
 */
interface TextboxProps {
    placeholder: string;
    value: string;
    onChangeText: (string) => void;
    field?: KeyboardTypeOptions;
    validate?: (string) => string;
    style?: StyleProp<ViewStyle>;
    [x: string]: any;
}

export const TextBox: React.FC<TextboxProps> = ({ placeholder, value, 
                                                  onChangeText, field,
                                                  validate, style, ...props }) => {
    const { theme } = useTheme();
    // Controls highlighted box feature
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => { setFocus(!focus) }
    // Controls error functionality
    const [error, setError] = useState('');
    // Controls keyboard
    const keyboard = (field !== undefined) ? field : "default";

    const handleUpdateText = (val) => {
        if (validate !== undefined) setError(validate(val));
        onChangeText(val);
    }

    return (
        <View style={styles.textboxContainer}>
            <View style={styles.textboxDefault}/>
            <View style={[{justifyContent: 'center'}, styles.textboxDefault]}>
                
                <TextInput
                    {...props}
                    onFocus={toggleFocus} // Become primary color
                    onBlur={toggleFocus} // Become secondary color
                    keyboardType={keyboard}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.textPlaceholder}
                    value={value}
                    onChangeText={(v) => handleUpdateText(v)}
                    style={[{
                        backgroundColor: (focus ? theme.colors.textboxHighlight
                            : theme.colors.textbox),
                        color: theme.colors.text,
                        borderColor: theme.colors.text},
                        styles.textboxField,
                        style
                    ]}
                />
            </View>
            {error ? (
                <View style={[{
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    borderWidth:1,
                    left:60,
                    padding:5
                }, styles.textboxDefault]}>
                    <Text style={{flexWrap:'wrap', fontSize:10}}>{error}</Text>
                </View>
            ) : (<View style={styles.textboxDefault}/>)}
        </View>
    )
}