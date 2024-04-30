import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import MyButtonComponent from '../button/MyButtonComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQrcode, faImage } from '@fortawesome/free-solid-svg-icons'; // Import the QrCode icon from the free-solid-svg-icons
import { appIcon } from '../../constants/appIcon';

interface Option {
  key: string;
  value: string | number;
}

interface ListOptionPickerProps {
  onSelect: (selected: { option1: string | number; option2: string | number, uri: string }) => void;
  visible: boolean;
  onClose: () => void;
  options?: Option[]; // Make options array optional
  options2?: Option[]; // Make options2 array optional
  optionalTitle?: string;
  optionalDesc?: string;
  onPickImage: () => void
  imgUri: string,
  handleQR: () => void,
  initOption: number
}

const ListOptionPicker: React.FC<ListOptionPickerProps> = ({
  onSelect,
  visible,
  onClose,
  options = [],
  options2 = [],
  optionalTitle,
  optionalDesc,
  onPickImage,
  imgUri = "",
  handleQR,
  initOption
}) => {
  const initialSelectedOption = initOption;
  const initialSelectedOption2 = options2.length > 0 ? options2[0].value : '';

  const [selectedOption, setSelectedOption] = useState<string | number>(initialSelectedOption);
  const [selectedOption2, setSelectedOption2] = useState<string | number>(initialSelectedOption2);
  const [uri, setUri] = useState(imgUri);

  useEffect(() => {
    setUri(imgUri);
  }, [imgUri]);

  useEffect(() => {
    setSelectedOption(initOption);
  }, [initOption]);

  // Handle option selection
  const handleOptionSelect = (value: string | number) => {
    setSelectedOption(value);
  };

  const handleOption2Select = (value: string | number) => {
    setSelectedOption2(value);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    const selected = { option1: selectedOption, option2: selectedOption2, uri: uri };
    onSelect(selected);
    onClose();
  };
  
  const handleOpenImagePicker = () => {
    onPickImage();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={{alignItems: 'center'}}>
            {optionalTitle && <Text style={styles.instructions}>{optionalTitle}</Text>}
            {optionalDesc && <Text style={styles.text}>{optionalDesc}</Text>}
          </View>
          {options.length > 0 && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue) => handleOptionSelect(itemValue)}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item key={option.key} label={option.key} value={option.value} />
              ))}
            </Picker>
          </View>
          )}
          {selectedOption === 1 && (
          <View style={styles.pickerImage}>
              <TouchableOpacity
                  onPress={() => handleOpenImagePicker()}
                  style={styles.pickerImageButton}
              >
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    {uri ? (
                        <Text style={{width: "90%"}}>{uri}</Text>
                    ) : (
                        <Text style={styles.normal}>Chọn ảnh xác nhận</Text>
                    )}
                    <FontAwesomeIcon icon={faImage} color={appColors.primary} size={appIcon.normal}></FontAwesomeIcon>
                  </View>
              </TouchableOpacity>
          </View>
          )}
          {selectedOption === 1 && (
            <TouchableOpacity onPress={handleQR}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <FontAwesomeIcon icon={faQrcode} color={appColors.warmOrange} size={appIcon.normal}/>
                <Text style={styles.linkQr}>Hiển thị QR chuyển khoản</Text>
              </View>
            </TouchableOpacity>          
          )}
          <View style={styles.buttonContainer}>
            <MyButtonComponent text="Xác nhận" color={appColors.primary} onPress={handleConfirm}/>
            <MyButtonComponent text="Hủy" color={appColors.primary} onPress={onClose}/>
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
    width: '90%',
    maxWidth: 400,
  },
  instructions: {
    marginBottom: 10,
    fontSize: appFontSize.normal,
    color: appColors.text,
    textAlign: 'left',
    fontWeight: 'bold', // Corrected to set font weight to bold
  },
  text: {
    marginBottom: 20,
    fontSize: appFontSize.normal,
    color: appColors.text,
    textAlign: 'left',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: appColors.boderColor,
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerImage: {
    borderWidth: 1,
    borderColor: appColors.boderColor,
    borderRadius: 5,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    justifyContent: "center"
  },
  pickerImageButton: {
    height: 50,
    width: '100%',
    justifyContent: "center",
    padding: 15
  },
  buttonContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center', // Center button content
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  normal: {
    color: appColors.text,
    fontSize: appFontSize.normal
  },
  linkQr: {
    color: appColors.warmOrange,
    marginVertical: 10,
    fontSize: appFontSize.normal
  }
});

export default ListOptionPicker;

