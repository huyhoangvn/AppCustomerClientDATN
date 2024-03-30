import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface YearPickerProps {
  onSelect: (year: number) => void;
  visible: boolean;
  onClose: () => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ onSelect, visible, onClose }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const years: number[] = generateYears();

  // Generate a list of years (e.g., from 1900 to the current year)
  function generateYears(): number[] {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = 1900;
    const yearsArray: number[] = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearsArray.push(year);
    }

    return yearsArray;
  }

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    onSelect(selectedYear);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={styles.instructions}>Chọn năm mà bạn muốn</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => handleYearSelect(itemValue as number)}
              style={styles.picker}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#808080' }]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={[styles.button, { backgroundColor: '#5A9324' }]}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  instructions: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'left',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#808080', // Change border color to gray
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default YearPicker;
