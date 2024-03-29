import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons

interface EditTextPasswordProps {
  label?: string;
  placeholder: string;
  textColor?: string;
  borderColor?: string;
  value?: string;
  icon?: IconProp;
  iconColor?: string;
  onChangeText?: (text: string) => void;
}

const EditTextPassword: React.FC<EditTextPasswordProps> = ({
  label,
  placeholder,
  textColor = 'black',
  borderColor = 'gray',
  value = '',
  icon,
  iconColor = 'black',
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, { borderColor }]}>
      {icon && <FontAwesomeIcon icon={icon} style={[styles.icon, { color: iconColor } as any]} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={[styles.input, { color: textColor }]}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={[styles.icon, { color: iconColor } as any]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
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

export default EditTextPassword;