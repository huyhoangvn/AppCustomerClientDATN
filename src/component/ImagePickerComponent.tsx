import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, PermissionsAndroid, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../constants/appColors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

interface Props {
    icon: IconProp; // Sử dụng IconProp từ font-awesome-svg-core
    size: number;
    stylesNew?: StyleProp<ViewStyle>;
    onPress?: () => void // Hàm callback khi nút được nhấn, tùy chọn
}

const ImagePickerComponent: React.FC<Props> = ({ icon, size, stylesNew,onPress }) => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          if(granted === PermissionsAndroid.RESULTS.GRANTED){
            const result:any = await launchImageLibrary({mediaType: 'photo'});
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
            const formData = new FormData();
            formData.append("hinhAnh",{
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: result.assets[0].type
            });
            
          } else {
            console.log("từ chối");
          }
      
        } catch (error) {
           console.log("error");
        }
      };

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require('../assest/image/logo.jpg')} style={{ width: 200, height: 200, }} />
        )}
      </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },
});

export default ImagePickerComponent;
