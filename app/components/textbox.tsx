import React from 'react';
import { StyleProp, TextInput, ViewStyle } from 'react-native';
import { useTheme } from '../utility/ThemeContext';
import { useState } from 'react';

/**
 * The textbox file creates textboxes that take in text input
 * 
 * @param {string} title - Text input when there is no text input
 * @param {StyleProp} style - Allow custom styles to be passed
 */
interface TextboxProps {
    title?: string;
    style?: StyleProp<ViewStyle>;
}

export const TextBox: React.FC<TextboxProps> = ({ title, style }) => {
    const { theme } = useTheme();
    // Controls highlighted box feature
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => { setFocus(!focus) }

    return (
        <TextInput
            onFocus={toggleFocus} // Become primary color
            onBlur={toggleFocus} // Become secondary color
            placeholder={title}
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