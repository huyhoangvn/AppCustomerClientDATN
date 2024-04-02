import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { ScrollView } from 'react-native-gesture-handler';
import MoreDetail from '../../component/detail/MoreDetail';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey, faEdit } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../../constants/appColors';
import { getData } from '../../utils/storageUtils';

const KhachHangDetailScreen : React.FC<NavProps> = ({ navigation }) =>  {
  useEffect(() => {

  })

  const openDoiMatKhauScreen = () => {
    //Truyền thông tin gì đó
    navigation.navigate("ChangeMatKhauScreen");
  };

  const openEditDetailKhachHangScreen = () => {
    //Truyền thông tin gì đó
    navigation.navigate("ChangeMatKhauScreen");
  };

  return (
      <ScrollView>
          <View style={styles.container}>
            <MoreDetail
                title="Đổi mật khẩu" 
                moreText="Xem thêm"
                onPress={() => openDoiMatKhauScreen()} 
                icon={faKey} // Icon tùy chọn
                iconColor={appColors.primary}
                titleColor={appColors.primary}
                moreTextColor ={appColors.primary}
                showTopBorder={false}
                boldTitle={false}
            />
            <MoreDetail
                title="Sửa thông tin" 
                moreText="Xem thêm"
                onPress={() => openEditDetailKhachHangScreen()} 
                icon={faEdit} // Icon tùy chọn
                iconColor={appColors.primary}
                titleColor={appColors.primary}
                moreTextColor ={appColors.primary}
                showTopBorder={false}
                boldTitle={false}
            /> 
          </View> 
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  }
});

export default KhachHangDetailScreen;