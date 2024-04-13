import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { appColors } from '../../constants/appColors';
import HeaderRightComponent from '../options-menu/HeaderRightComponent';

const Header = ({ backgroundImageUrl, color = "#000000"}: any) => {
    const navigation : any = useNavigation(); // Get navigation object using useNavigation hook

    const imageUrl = backgroundImageUrl ? backgroundImageUrl.toString() : '';

    const goBackEvent = () => {
        navigation.goBack(); // Navigate back when the back button is pressed
    };

    return (
        <View>
            <Image source={imageUrl ? { uri: imageUrl } : require('./../../assest/image/default-image.jpg')} style={styles.headerBackground} />
            <View style={styles.header}>
                <TouchableOpacity onPress={goBackEvent}>
                    <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} size={25} color={appColors.white} />
                </TouchableOpacity>
                <HeaderRightComponent navigation={navigation} backToHomeEnabled={true} color={color}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        width: '100%',
        height: 150,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: 150,
    },
    backIcon: {
        marginRight: 10,
    },
});

export default Header;

