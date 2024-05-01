import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import MyButtonComponent from '../button/MyButtonComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQrcode, faImage, faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons'; // Import the QrCode icon from the free-solid-svg-icons
import { appIcon } from '../../constants/appIcon';
import ImagePicker from 'react-native-image-crop-picker';

interface Option {
  key: string;
  value: string | number;
}

interface ImageVerificationOptionProps {
  onSelect: (selected: { uri: string }) => void;
  visible: boolean;
  onClose: () => void;
  optionalDesc?: string;
  optionalTitle?: string;
  imgUrl: string,
}

const ImageVerificationOption: React.FC<ImageVerificationOptionProps> = ({
  onSelect,
  visible,
  onClose,
  optionalDesc,
  optionalTitle,
  imgUrl = ""
}) => {
  const [uri, setUri] = useState(imgUrl);

  useEffect(() => {
    setUri(imgUrl);
  }, [imgUrl]);

  // Handle confirm button press
  const handleConfirm = () => {
    const selected = { uri: uri };
    onSelect(selected);
    onClose();
  };

  const launchCamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
    }).then(image => {
        setUri(image.path)
    });
  }

  const launchGallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false
    }).then(image => {
        setUri(image.path)
    });
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={{alignItems: 'center'}}>
            {optionalTitle && <Text style={styles.instructions}>{optionalTitle}</Text>}
            {optionalDesc && <Text style={styles.text}>{optionalDesc}</Text>}
          </View>
          <Image
            source={uri ? { uri: uri } : require("../../assest/image/default-image.jpg")}
            style={styles.image}
            />
          <TouchableOpacity onPress={launchCamera} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <FontAwesomeIcon icon={faCamera} color={appColors.warmOrange} size={appIcon.normal}/>
                <Text style={[styles.normal, {color: appColors.warmOrange}]}>Chụp ảnh trực tiếp</Text>
              </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={launchGallery} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <FontAwesomeIcon icon={faFileImage} color={appColors.warmOrange} size={appIcon.normal}/>
                <Text style={[styles.normal, {color: appColors.warmOrange}]}>Chọn ảnh từ thư viện ảnh</Text>
              </View>
          </TouchableOpacity> 
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
    zIndex: 1000,
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
  image: {
    width: '100%', // Adjust the width and height as needed
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ImageVerificationOption;