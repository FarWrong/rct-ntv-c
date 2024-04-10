import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';

import { useTheme } from '../utility/ThemeContext';

/**
 * The Popup Component creates popup messages that contain content separate from the page.
 * 
 * NOTE: ALWAYS pass the {visible} component. It should be a React Hook, with {togglePopup}
 * changing its variable.
 * 
 * @param {React.ReactNode} children - Content inside of the Modal
 * @param {function()} togglePopup - Function that toggles whether or not the popup is open/closed
 * @param {any} x - Other components that can be passed to Modal
 */
interface PopupProps {
  children?: React.ReactNode;
  togglePopup: () => void;
  [x: string]: any;
}

export const Popup: React.FC<PopupProps> = ({ children, togglePopup, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <Modal {...props} animationType={'fade'} transparent={true}>
      <View 
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          flex:1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View 
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 50,
            borderRadius: theme.popup.borderRadius,
            backgroundColor: theme.colors.background,
          }}
        >
          <View 
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: theme.popup.flexBody,
              padding: theme.popup.padding,
            }}
          >
            {children}
          </View>
          <TouchableHighlight 
            underlayColor={theme.colors.buttonPressed}
            onPress={togglePopup}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: theme.popup.flexClose,
              borderBottomLeftRadius: theme.popup.borderRadius,
              borderBottomRightRadius: theme.popup.borderRadius,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Ionicons
              name={'close-circle-outline'}
              size={40}
              color={theme.colors.secondary}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}