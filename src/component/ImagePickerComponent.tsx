import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { appColors } from '../constants/appColors';

interface Props {
    onImageSelect: (imagePath: string) => void;
    style?: StyleProp<ImageStyle>; // Props style
    imageUri?: string; // Props uri ảnh
}


const ImagePickerComponent: React.FC<Props> = ({ onImageSelect, imageUri, style}) => {
    const [imagePath, setImagePath] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            const result: any = await launchImageLibrary({ mediaType: 'photo' });
            if (result.assets && result.assets.length > 0) {
                setImagePath(result.assets[0].uri);
                onImageSelect(result.assets[0].uri); // Gọi hàm callback để truyền đường dẫn hình ảnh
            }
        } catch (error) {
            console.log("Error picking image:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {imagePath ? (
                    <Image
                        source={{ uri: imagePath }}
                        style={[
                            styles.image, // Sử dụng style mặc định
                            style // Ghi đè style từ props
                        ]}
                    />
                ) : imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={[
                            styles.image, // Sử dụng style mặc định
                            style // Ghi đè style từ props
                        ]}
                    />
                ) : (
                    <Image
                        source={require('../assest/image/logo.jpg')}
                        style={[
                            styles.image, // Sử dụng style mặc định
                            style // Ghi đè style từ props
                        ]}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },
    placeholderImage: {
        width: 200,
        height: 200,
    },
});

export default ImagePickerComponent;
