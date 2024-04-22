import React from 'react';
import { TouchableHighlight, Text, StyleProp, ViewStyle } from 'react-native';

import { styles } from '../utility/style';
import { useTheme } from '../utility/ThemeContext';

// Black background and white text in light theme, inverted on dark theme
interface ButtonProps {
  title?: string; // Correct typing for string
  onPress?: () => void; // Define onPress as a function that returns void
  style?: StyleProp<ViewStyle>; // Allow custom styles to be passed
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      underlayColor={theme.colors.buttonPressed}
      onPress={onPress}
      style={[
        {backgroundColor: theme.colors.primary},
        styles.buttonContainer,
        style // Allows for additional styling to be applied
      ]}
    >
      <Text style={[
        {color: theme.colors.buttonText},
        styles.buttonText
      ]}>
        {title || 'Button'}
      </Text>
    </TouchableHighlight>
  );
};