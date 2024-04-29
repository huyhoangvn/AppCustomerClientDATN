import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { ScrollView } from 'react-native-gesture-handler';
import MoreDetail from '../../component/detail/MoreDetail';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey, faEdit } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../../constants/appColors';
import { getData } from '../../utils/storageUtils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { appImageSize } from '../../constants/appImageSize';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import TextViewComponent from '../../component/text/TextViewComponent';
import { KhachHang } from '../../models/KhachHang';
import authenticationAPI from '../../apis/authApi';
import {useFocusEffect} from '@react-navigation/native';
import {DefaultAvatar} from '../../assest/svgs';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';

const DetailKhachHangScreen: React.FC<NavProps> = ({ navigation, route }:any) =>  {
  // const {idUser, position} = route.params;
  const [item, setItem] = useState<any>();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [data , setData] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const openDoiMatKhauScreen = () => {
    navigation.navigate("ChangeMatKhauScreen");
  };

  const openEditDetailKhachHangScreen = () => {
    navigation.navigate("EditDetailKhachHangScreen", {item: item});
  };
  const getDetail = async () => {
    const result = await getData();
    const idKH = result?.idKH;
    try {
      setLoading(true);
      const res : any = await authenticationAPI.HandleAuthentication(
        `/khachhang/thong-tin/${idKH}`,
        'get',
      );
      if (res.success === true) {
        setItem(res.index);
        setMsg(res.msg);
      }
      else{
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (e) {
      console.log(e);
      setMsg('Request timeout. Please try again later.');
      handleCloseAlert();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getDetail();    
      return () => {
        // Cleanup logic nếu cần (không bắt buộc)
      };
    }, []),
  );
  return (
     <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
      {item && item.hinhAnh ? (
      <Image
       style={{
        width: wp(40),
        height: hp(20),
        borderRadius: wp(20),
        overflow: 'hidden',
        backgroundColor: 'white',
        borderColor: appColors.primary,
        borderWidth: 1,
       }}
       source={{ uri: item.hinhAnh }}
      />
       ) : (
       <DefaultAvatar/>
       )}
     </View>
        <View style={styles.main}>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Tên"
            rightText={item?.tenKH}
            leftBold={true}
            showBorderBottom={false}
          />
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Giới tính"
            rightText=   {item?.gioiTinh === 2 ? 'Nam' : 'Nữ'}
            leftBold={true}
            showBorderBottom={false}
          />         
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Email"
            rightText=  {item?.taiKhoan}
            leftBold={true}
            showBorderBottom={false}
          /> 
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Địa chỉ"
            rightText=  {item?.diaChi}
            leftBold={true}
            showBorderBottom={false}
          /> 
           
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Số điện thoại"
            rightText=  {item?.sdt}
            leftBold={true}
            showBorderBottom={false}
          />       
          </View>
        </View>

        <MoreDetail
          title="Đổi mật khẩu" 
          moreText="Xem thêm"
          onPress={() => openDoiMatKhauScreen()} 
          icon={faKey} 
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
          icon={faEdit} 
          iconColor={appColors.primary}
          titleColor={appColors.primary}
          moreTextColor ={appColors.primary}
          showTopBorder={false}
          boldTitle={false}
        /> 
      </View> 
      <LoadingComponent visible={loading} />
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    justifyContent: 'space-between',
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
 
 
});

export default DetailKhachHangScreen;