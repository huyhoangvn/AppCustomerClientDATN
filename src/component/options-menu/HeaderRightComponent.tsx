import React, { useEffect, useRef } from 'react';
import NavProps from '../../models/props/NavProps';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH,faLock, faEnvelope, faShop, faCartShopping, faRightFromBracket, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { appColors } from '../../constants/appColors';
import { clearAllData, deleteToken, getData } from './../../utils/storageUtils';

interface HeaderProps extends NavProps {
    backToHomeEnabled?: boolean;
    color?: string;
}

const HeaderRightComponent: React.FC<HeaderProps> = ({ navigation, backToHomeEnabled = false, color = "#000000" }: any) => {

    const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
    const [name, setName] = React.useState<string>('');

    const handleGearClick = () => {
        setShowOptionsMenu(true);
    };

    const handleOptionClick = (screenName: string) => {
        setShowOptionsMenu(false);
        navigation.navigate(screenName);
    };

    useEffect(() => {
        const getName = async () => {
            const result = await getData();
            setName(result?.tenKH || 'Tên khách hàng');
        };
        getName();
    }, []);
    


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
                <FontAwesomeIcon icon={faEllipsisH} size={24} color={appColors.primary}/>
            </TouchableOpacity>

            <Menu opened={showOptionsMenu} onBackdropPress={() => setShowOptionsMenu(false)}>
                <MenuTrigger />
                <MenuOptions customStyles={menuOptionsStyles}>
                    {name && <MenuOption onSelect={() => {}} customStyles={menuOptionStyles}>
                        <View style={styles.viewOption}>
                            <FontAwesomeIcon icon={faUser} size={20} color={appColors.primary} />
                            <Text style={styles.textOption}>{name}</Text>
                        </View>
                    </MenuOption>}
                    {backToHomeEnabled && <MenuOption onSelect={() => backToHome()} customStyles={menuOptionStyles}>
                        <View style={styles.viewOption}>
                            <FontAwesomeIcon icon={faHome} size={20} color={appColors.primary} />
                            <Text style={styles.textOption}>Về trang chủ</Text>
                        </View>
                    </MenuOption>}
                    <MenuOption onSelect={() => {}} customStyles={menuOptionStyles}>
                        <View style={styles.viewOption}>
                            <FontAwesomeIcon icon={faCartShopping} size={20} color={appColors.primary} />
                            <Text style={styles.textOption}>Giỏ hàng</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => logout()} customStyles={menuOptionStyles}>
                        <View style={styles.viewOption}>
                            <FontAwesomeIcon icon={faRightFromBracket} size={20} color={appColors.primary} />
                            <Text style={styles.textOption}>Đăng xuất</Text>
                        </View>
                    </MenuOption>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    touchableOpacity: {
        marginRight: 10,
    },
    viewOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    textOption: {
        marginLeft: 10,
        color: appColors.text,
        fontSize: 16,
    },
});

export default HeaderRightComponent;


