import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { appIcon } from '../../constants/appIcon';

interface FloatingButtonProps {
  onPressItem: () => void;
  buttonColor?: string;
  iconColor?: string;
  icon: IconProp;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPressItem,
  buttonColor = 'blue', // Default button color
  iconColor = '#ffffff', // Default icon color
  icon,
}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: buttonColor }]} onPress={onPressItem}
    activeOpacity={0.7}>
      <FontAwesomeIcon icon={icon} color={iconColor} size={appIcon.big} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 15,
  }
});

export default FloatingButton;
