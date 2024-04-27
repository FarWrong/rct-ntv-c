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
 * @param children    - Content inside of the Modal
 * @param togglePopup - Toggles whether or not the popup is open/closed
 * @param visible     - Whether or not the current popup is visible
 */
interface PopupProps {
  children?: React.ReactNode;
  togglePopup: (boolean) => void;
  visible: boolean;
}

export const Popup: React.FC<PopupProps> = ({ children, togglePopup, visible, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <Modal {...props} 
      animationType={'fade'}
      transparent={true}
      visible={visible}
    >
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
            onPress={() => togglePopup(false)}
            style={styles.popupClose}
          >
            <Ionicons
              name='close'
              size={20}
              color={theme.colors.secondary}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}