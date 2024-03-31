import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { appColors } from '../../constants/appColors';

const Header = ({ backgroundImageUrl, goBackEvent } : any) => {
  return (
    <>
      <Image source={backgroundImageUrl} style={styles.headerBackground} />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackEvent}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} size={appIcon.backArrowIcon} color={appColors.white} />
        </TouchableOpacity>
        {/* Add other header content here */}
      </View>
    </>
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
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: 150,
    },
    backIcon: {
      marginRight: 10,
    },
});

export default Header;
