import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleProp, TextInput, ViewStyle } from 'react-native';

import { useTheme } from '../utility/ThemeContext';

/**
 * The textbox component creates textboxes that take in text input
 * 
 * @param {string} placeholder - Text input when there is no text input
 * @param {string} value - Variable to pass input text to
 * @param {function()} onChangeText - Function to run when text is changed
 * @param {boolean} secure - Check if the text field should be secure
 * @param {StyleProp} style - Allow custom styles to be passed
 * @param {KeyboardTypeOptions} field - Determines the keyboard used for the input
 */
interface TextboxProps {
    placeholder?: string;
    value?: string;
    field?: KeyboardTypeOptions;
    onChangeText?: (string) => void;
    secure?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const TextBox: React.FC<TextboxProps> = ({ placeholder, value, field, onChangeText, secure, style }) => {
    const { theme } = useTheme();
    // Controls highlighted box feature
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => { setFocus(!focus) }
    // Controls keyboard
    const keyboard = (typeof field !== undefined) ? field : "default";

    return (
        <TextInput
            onFocus={toggleFocus} // Become primary color
            onBlur={toggleFocus} // Become secondary color
            keyboardType={keyboard}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secure}
            style={[
                {
                    borderColor: (focus ? theme.colors.primary
                        : theme.colors.secondary),
                    borderWidth: theme.textBox.borderWidth,
                    gap: theme.textBox.gap,
                    height: theme.textBox.height,
                    paddingHorizontal: theme.textBox.paddingHorizontal,
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                style
            ]}
        />
    )
}