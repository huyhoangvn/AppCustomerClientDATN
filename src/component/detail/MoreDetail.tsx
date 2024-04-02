import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import { appIcon } from '../../constants/appIcon';

const MoreDetail = ({ title, moreText, icon, onPress, iconColor, titleColor, moreTextColor, showTopBorder = true, boldTitle = true}: any) => {
  return (
    <View style={[styles.container, showTopBorder && styles.topBorder]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
            {icon && (
                <FontAwesomeIcon
                icon={icon}
                color={iconColor || appColors.primary}
                size={appIcon.normal}
                style={styles.icon}
                />
            )}
            <Text style={[styles.text, { color: titleColor || appColors.primary }, boldTitle && { fontWeight: 'bold' }]}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
            <Text style={[styles.buttonText, { color: moreTextColor || appColors.primary }]}>{moreText}</Text>
            <FontAwesomeIcon icon={faChevronRight} color={moreTextColor || appColors.coolPurple} size={appIcon.normal}/>
            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginVertical: 5,
    borderColor: appColors.boderColor,
  },
  topBorder: {
    borderTopWidth: 1,
  },
  text: {
    fontSize: appFontSize.normal,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: appFontSize.normal,
  },
  icon: {
    marginRight: 10,
  },
});

export default MoreDetail;
