import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Mon } from '../../models/Mon'
import TextComponent from '../TextComponent';
import { ArrowDown2 } from 'iconsax-react-native';
import { appColors } from '../../constants/appColors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AddMonScreen from '../../screen/mon/AddMonScreen';

interface Props {
  label?: string;
  placeholder: string;
  textColor?: string;
  borderColor?: string;
  value?: Mon[];
  icon?: IconProp;
  iconColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}

const DropdownPicker = (props: Props) => {
    const { label, placeholder, textColor, borderColor, value, icon, iconColor, textStyles, onChangeText } = props;
    return (
        <View style={[styles.container, { borderColor }]}>
            {icon && <FontAwesomeIcon icon={icon} fa-thin style={[styles.icon, { color: iconColor } as any]} />}

            <TouchableOpacity style={styles.touchable}>
                <View style={styles.labelContainer}>
                    {label && <TextComponent text={label} styles={styles.label} />}
                </View>
                <View style={styles.arrowIconContainer}>
                    <ArrowDown2 size={22} color={appColors.gray} style={styles.arrowIcon} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 0,
        paddingHorizontal: 10,
        backgroundColor: appColors.editTextColor,
        justifyContent: 'space-between',
        elevation: 8, // Adjust the elevation value as needed
    },
    
    labelContainer: {
        flex: 1,
        marginRight: 10,
    },
    arrowIconContainer: {
        width: 22, // Width of the arrow icon
        alignItems: 'flex-end',
    },
    label: {
        marginRight: 5,
    },
    arrowIcon: {
        marginRight: 14,
    },
    icon: {
        marginRight: 10, // Margin right for the icon
    },
    touchable: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
});

export default DropdownPicker;