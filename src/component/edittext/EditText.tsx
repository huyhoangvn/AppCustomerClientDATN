import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../../constants/appColors';

interface EditTextProps {
  label?: string;
  placeholder: string;
  textColor?: string;
  borderColor?: string;
  value?: string;
  inputType: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  icon?: IconProp;
  iconColor?: string; // New prop for icon color
  onChangeText?: (text: string) => void;
}

const EditText: React.FC<EditTextProps> = ({
  label,
  placeholder,
  textColor = 'black',
  borderColor = 'gray',
  value = '',
  inputType,
  icon,
  iconColor = 'black', // Default icon color
  onChangeText,
}) => {
  return (
    <View style={[styles.container, { borderColor : borderColor }]}>
      {icon && <FontAwesomeIcon icon={icon} style={[styles.icon, { color: iconColor } as any]} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={appColors.boderColor}
        style={[styles.input, { color: textColor }]}
        keyboardType={inputType}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10
  },
  icon: {
    paddingHorizontal: 10,
    width: 24,
    height: 24,
  },
});

export default EditText;

