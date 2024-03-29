import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker from @react-native-community/datetimepicker
import { appColors } from '../constants/appColors';

interface Props {
  label?: string;
  placeholder: string;
  textColor?: string;
  borderColor?: string;
  value?: string;
  icon?: IconProp;
  stylesEdit?: StyleProp<ViewStyle>;
  stylesContainer?: StyleProp<ViewStyle>;
  iconRight?: IconProp;
  iconColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  onUpdate?: (time: string) => void;}

const EditTextComponent = (props: Props) => {
  const {
    label,
    placeholder,
    textColor,
    borderColor,
    value,
    icon,
    iconColor,
    textStyles,
    iconRight,
    onChangeText,
    stylesEdit,
    stylesContainer,
    onUpdate,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize selectedDate with current date and time

  const toggleVisibility = () => {
    if (label === 'pass') {
      setShowPassword(!showPassword);
    } else if (label === 'date') {
      setShowDate(!showDate);
    }
  };

  // Trong hàm handleDateChange, gọi onUpdate để cập nhật giá trị thời gian
  const handleDateChange = (event: any, selectedDate: Date) => {
    setShowDate(false); // Close the DateTimePicker when a date is selected
    
    // Định dạng thời gian đã chọn thành chuỗi HH:mm
    const formattedTime = selectedDate.getHours().toString().padStart(2, '0') + ':' +
                          selectedDate.getMinutes().toString().padStart(2, '0');
  
    // Gửi thời gian đã định dạng tới hàm onUpdate
    if (props.onUpdate) {
      props.onUpdate(formattedTime); // Cập nhật giá trị thời gian
    }
  };
  
  return (
    <View style={[styles.container, { borderColor }, stylesContainer]}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={[styles.icon, { color: iconColor }]}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={[textStyles, styles.input, { color: textColor }, stylesEdit]}
        secureTextEntry={label === 'pass' ? !showPassword : false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={label === 'number' ? 'numeric' : 'default'}
      />
      {iconRight && (
        <TouchableOpacity onPress={toggleVisibility}>
          <FontAwesomeIcon
            icon={iconRight}
            style={[styles.icon, { color: iconColor }]}
          />
        </TouchableOpacity>
      )}
      {(label === 'pass' || label === 'date') && (
        <TouchableOpacity onPress={toggleVisibility}>
          <FontAwesomeIcon
            icon={
              label === 'pass'
                ? showPassword
                  ? faEyeSlash
                  : faEye
                : faCalendarTimes
            }
            style={[styles.icon, { color: iconColor }]}
          />
        </TouchableOpacity>
      )}
      {showDate && label === 'date' && (
        <DateTimePicker
          value={selectedDate}
          mode="time" 
          is24Hour={true} 
          display="spinner" // Use 'spinner' for Android
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: appColors.editTextColor,
    elevation: 8, // Adjust the elevation value as needed
  },
  input: {
    borderRadius: 20,
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: appColors.editTextColor,
  },
  icon: {
    paddingHorizontal: 20,
    width: 24,
    height: 24,
  },
});

export default EditTextComponent;
