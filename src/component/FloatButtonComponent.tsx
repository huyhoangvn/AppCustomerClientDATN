import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../constants/appColors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    icon: IconProp; // Sử dụng IconProp từ font-awesome-svg-core
    size: number;
    stylesNew?: StyleProp<ViewStyle>;
    onPress?: () => void // Hàm callback khi nút được nhấn, tùy chọn
}

const FloatButtonComponent: React.FC<Props> = ({ icon, size, stylesNew,onPress }) => {
    return (
        <TouchableOpacity style={[stylesNew,styles.addButton]} onPress={onPress}>
            <FontAwesomeIcon icon={icon} size={size} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        bottom: 20,
        right: 20,
        backgroundColor: appColors.primary,
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center', // Để icon được căn giữa theo chiều dọc
        alignItems: 'center', // Để icon được căn giữa theo chiều ngang
        elevation: 3,
    },
});

export default FloatButtonComponent;
