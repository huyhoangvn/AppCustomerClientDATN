import React from 'react';
import NavProps from '../../models/props/NavProps';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { appColors } from '../../constants/appColors';
import { clearAllData, deleteToken } from './../../utils/storageUtils';

interface HeaderProps extends NavProps {
    tenKH?: string;
    backToHomeEnabled?: boolean;
    color?: string;
}

const HeaderRightComponent: React.FC<HeaderProps> = ({ navigation, tenKH, backToHomeEnabled = false, color = "#000000" }: any) => {

    const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);

    const handleGearClick = () => {
        setShowOptionsMenu(true);
    };

    const handleOptionClick = (screenName: string) => {
        setShowOptionsMenu(false);
        navigation.navigate(screenName);
    };

    const logout = async () => {
        setShowOptionsMenu(false);
        try {
            await clearAllData();
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const backToHome = async () => {
        setShowOptionsMenu(false);
        if (backToHomeEnabled) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={handleGearClick}
            >
                <FontAwesomeIcon icon={faEllipsisH} size={24} color={color}/>
            </TouchableOpacity>

            <Menu opened={showOptionsMenu} onBackdropPress={() => setShowOptionsMenu(false)}>
                <MenuTrigger />
                <MenuOptions customStyles={menuOptionsStyles}>
                    {tenKH && <Text style={styles.menuText}>{tenKH}</Text>}
                    {backToHomeEnabled && <MenuOption onSelect={() => backToHome()} customStyles={menuOptionStyles}><Text>Về trang chủ</Text></MenuOption>}
                    <MenuOption onSelect={() => logout()} customStyles={menuOptionStyles}><Text>Đăng xuất</Text></MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const menuOptionsStyles = {
    optionsContainer: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 8,
    },
};

const menuOptionStyles = {
    optionText: {
        color: appColors.primary,
        fontSize: 16,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    touchableOpacity: {
        marginLeft: 10,
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: appColors.primary,
        padding: 5
    },
});

export default HeaderRightComponent;


