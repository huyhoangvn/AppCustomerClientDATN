import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  color?: string;
  text: string;
  onPress: (...args: any[]) => void;
}

const MyButtonComponent: React.FC<ButtonProps> = ({ color = 'orange', text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 26.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default MyButtonComponent;