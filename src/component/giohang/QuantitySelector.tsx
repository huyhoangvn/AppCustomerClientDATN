import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import { text } from '@fortawesome/fontawesome-svg-core';

const QuantitySelector = ({ initialValue, onChange, buttonBackgroundColor = appColors.white, buttonBorderColor = appColors.boderColor, iconColor = appColors.text }: any) => {
  const [quantity, setQuantity] = useState(initialValue || 1);

  const increaseQuantity = () => {
    if (quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const handleInputChange = (text : string) => {
    const newQuantity = parseInt(text);
    if (!isNaN(newQuantity) && newQuantity > 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <View style={[styles.container, { borderColor: buttonBorderColor || appColors.boderColor }]}>
      <TouchableOpacity style={[styles.buttonMinus, { backgroundColor: buttonBackgroundColor || appColors.white, 
        borderColor: buttonBorderColor || appColors.boderColor }]} onPress={decreaseQuantity}
        activeOpacity={0.5}>
        <FontAwesomeIcon icon={faMinus} size={appIcon.small} color={iconColor || appColors.text} />
      </TouchableOpacity>
      <TextInput
        style={[styles.quantityInput, { color: iconColor || appColors.text }]}
        value={quantity.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styles.buttonPlus, { backgroundColor: buttonBackgroundColor || appColors.white,
        borderColor: buttonBorderColor || appColors.boderColor }]} onPress={increaseQuantity}
        activeOpacity={0.5}>
        <FontAwesomeIcon icon={faPlus} size={appIcon.small} color={iconColor || appColors.text} />
      </TouchableOpacity>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20, // Adjust this value to control the pill shape
    overflow: 'hidden', // Clip the content outside the border
    borderWidth: 1
  },
  buttonMinus: {
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 1,
  },
  buttonPlus: {
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 1
  },  
  quantityInput: {
    padding: 0,
    fontSize: appFontSize.normal,
    textAlign: 'center',
  },
});

export default QuantitySelector;
