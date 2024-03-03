import * as React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
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
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: theme.button.borderRadius,
          backgroundColor: theme.colors.primary,
          height: theme.button.height,
          paddingHorizontal: theme.button.paddingHorizontal,
          alignItems: 'center',
          justifyContent: 'center'
        },
        style // Allows for additional styling to be applied
      ]}
    >
      <Text style={{
        color: theme.colors.buttonText,
        fontSize: theme.fontSizes.button,
        fontWeight: 'bold', // Matches "font-semibold"
      }}>
        {title || 'Button'}
      </Text>
    </TouchableOpacity>
  );
};