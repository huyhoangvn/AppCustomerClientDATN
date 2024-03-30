import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import NavProps from '../../models/props/NavProps';
import YearPicker from '../../component/YearPicker';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const TimKiemMonScreen : React.FC<NavProps> = ({ navigation }) =>  {
  const [year, setYear] = useState<number | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  // Function to handle the selection of year
  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setIsPickerVisible(false); // Close the YearPicker modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setIsPickerVisible(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Year"
          value={year ? year.toString() : ''}
          editable={false}
        />
        <FontAwesomeIcon icon={faCaretDown} style={styles.icon} />
      </TouchableOpacity>
      <YearPicker
        visible={isPickerVisible}
        onSelect={handleYearSelect}
        onClose={() => setIsPickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row', // To allow the TouchableOpacity to fill width
    margin: 10,
    borderRadius: 10
  },
  input: {
    flex: 1, // To make TextInput fill the remaining space
    height: 40,
    color: 'black', // Set the text color to black
    // Add any other input styles as needed
  },
  icon: {
    marginLeft: 10, // Adjust the spacing between input and icon as needed
    alignSelf: 'center', // Align the icon vertically center with the text input
  }
});

export default TimKiemMonScreen;
