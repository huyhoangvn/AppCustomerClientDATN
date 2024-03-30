import React from 'react';
import NavProps from '../../models/props/NavProps';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH, faUser, faSmile  } from '@fortawesome/free-solid-svg-icons'; // Import the smiley user icon
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { appFontSize } from '../../constants/appFontSizes';
import { appColors } from '../../constants/appColors';
import { deleteToken } from './../../utils/storageUtils'; // Update this import path with the correct path to your AsyncStorage functions file

const HeaderRightComponent: React.FC<NavProps & { tenKH: string }> = ({ navigation, tenKH }) => {
    
    const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
    const handleGearClick = () => {
        setShowOptionsMenu(true);
    };

    const handleOptionClick = (screenName: string) => {
        setShowOptionsMenu(false); // Close the menu when an option is clicked
        navigation.navigate(screenName);
    };

    const logout = async () => {
        setShowOptionsMenu(false); // Close the menu when an option is clicked
        //Xóa thông tin đăng nhâp
        try {
            await deleteToken();
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    return (
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handleGearClick}
        >
        <FontAwesomeIcon icon={faEllipsisH} size={24} color={'gray'} />
        </TouchableOpacity>

        <Menu opened={showOptionsMenu} onBackdropPress={() => setShowOptionsMenu(false)}>
        <MenuTrigger />
        <MenuOptions>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', margin: 5 }}>
                {/* <FontAwesomeIcon icon={faSmile} size={appFontSize.normal} color={appColors.coolPurple} /> */}
                <Text style={{ fontWeight: 'bold', margin: 5, color: appColors.primary }}>{tenKH}</Text>
                <MenuOption onSelect={() => logout()}><Text>Đăng xuất</Text></MenuOption>
            </View>

        </MenuOptions>
        </Menu>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity: {
        marginLeft: 15,
        marginRight: 15,
    }
});

export default HeaderRightComponent;