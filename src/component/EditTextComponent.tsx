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
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Chỉnh sửa dòng import
import { appColors } from '../constants/appColors';

// Sử dụng dữ liệu mẫu appColors cho mục đích demo

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
  onDateSelected?: (selectedDate: Date | string) => void; // Cập nhật kiểu dữ liệu
  onChangeText?: (text: string) => void;
  onUpdate?: (time: string) => void;
}

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
    onDateSelected,
    onUpdate,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const toggleVisibility = () => {
    if (label === 'pass') {
      setShowPassword(!showPassword);
    } else if (label === 'date') {
      setShowDate(!showDate);
    } else if (label === 'time') {
      setShowDate(!showDate);
    }
  };
  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    setShowDate(false);
  
    // Định dạng ngày thành chuỗi "dd/mm/yyyy"
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${
      (selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${
      selectedDate.getFullYear()}`;
  
    if (onDateSelected) {
        onDateSelected(formattedDate); // Truyền ngày đã định dạng xuống trang con
    }
  };

  
  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowDate(false);

    if (selectedTime) {
      setSelectedTime(selectedTime);

      // Format the selected time
      const formattedTime = selectedTime.getHours().toString().padStart(2, '0') + ':' +
                            selectedTime.getMinutes().toString().padStart(2, '0');

      // Pass the formatted time to the parent component
      if (onUpdate) {
        onUpdate(formattedTime);
      }
    }
  };

  return (
    <View style={[styles.container, {borderColor}, stylesContainer]}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={[styles.icon, {color: iconColor} as ViewStyle]} // Cast the style object to ViewStyle
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={[textStyles, styles.input, {color: textColor}, stylesEdit]}
        secureTextEntry={label === 'pass' ? !showPassword : false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={label === 'number' ? 'numeric' : 'default'}
      />
      {iconRight && (
        <TouchableOpacity onPress={toggleVisibility}>
          <FontAwesomeIcon
            icon={iconRight}
            style={[styles.icon, {color: iconColor} as ViewStyle]} // Cast the style object to ViewStyle
          />
        </TouchableOpacity>
      )}
      {(label === 'pass' || label === 'date' || label === 'time') && (
        <TouchableOpacity onPress={toggleVisibility}>
          <FontAwesomeIcon
            icon={
              label === 'pass'
                ? showPassword
                  ? faEyeSlash
                  : faEye
                : faCalendarTimes
            }
            style={[styles.icon, {color: iconColor} as ViewStyle]} // Add 'as ViewStyle' to fix the problem
          />
        </TouchableOpacity>
      )}
      {showDate && label === 'date' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={(event: any, selectedDate: Date | undefined) =>
            handleDateChange(event, selectedDate as Date)
          }
        />
      )}
      {showDate && label === 'time' && (
        <DateTimePicker
          value={selectedDate}
          mode="time" 
          is24Hour={true} 
          display="spinner" // Use 'spinner' for Android
          onChange={handleTimeChange}
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
    backgroundColor: appColors.white,
    elevation: 8,
  },
  input: {
    borderRadius: 20,
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: appColors.white,
  },
  icon: {
    paddingHorizontal: 20,
    width: 24,
    height: 24,
  },
});

export default EditTextComponent;
