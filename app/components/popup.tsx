import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';

import { useTheme } from '../utility/ThemeContext';
import { styles } from '../utility/style';

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
      <View style={[
        {backgroundColor: theme.colors.shadow},
        styles.popupBackground
      ]}>
        <View style={[
          {backgroundColor: theme.colors.background},
          styles.popupContainer
        ]}>
          <View style={styles.popupBody}>
            {children}
          </View>
          <TouchableHighlight 
            underlayColor={theme.colors.buttonPressed}
            onPress={togglePopup}
            style={[
              {backgroundColor: theme.colors.primary},
              styles.popupClose
            ]}
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