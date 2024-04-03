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


const dummyData = {
  tenNV: "TRAN XUAN DUC",
  gioiTinh: 2, // 2 for male, 1 for female
  taiKhoan: "ductxph29059@gmail.com",
  diaChi: "Vân canh, Hoài Đức, Nam Từ Liêm ",
  sdt: "0123456789",
  hinhAnh: "https://cdn-i.vtcnews.vn/files/ctv.giaoduc/2019/03/15/img-1329-1-0135095.jpg" // URL of the image
};

const KhachHangDetailScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [item, setItem] = useState<any>(dummyData);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const openDoiMatKhauScreen = () => {
    navigation.navigate("ChangeMatKhauScreen");
  };

  const openEditDetailKhachHangScreen = () => {
    navigation.navigate("EditDetailKhachHangScreen");
  };
  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/nhanvienquanly/chi-tiet-nhan-vien/${idUser}`,
        'get',
      );

      if (res.success === true) {
        setItem(res.index);
      } else {
        // Xử lý khi có lỗi từ API
        setMsg('Request failed. Please try again.');
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
        <Image
            source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/image/default-avatar.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: appImageSize.size100.width, height: appImageSize.size100.height }}
            defaultSource={require('./../../assest/image/default-avatar.jpg')}
          />  
        </View>
        <View style={styles.main}>
          <View style={styles.viewText}>
            <Text>Tên</Text>
            <Text style={styles.textPrimary}>{item?.tenNV}</Text>
          </View>
          <View style={styles.viewText}>
            <Text>Giới tính</Text>
            <Text style={styles.textPrimary}>
              {item?.gioiTinh === 2 ? 'Nam' : 'Nữ'}
            </Text>
          </View>
          <View style={styles.viewText}>
            <Text>Email</Text>
            <Text style={styles.textPrimary}>{item?.taiKhoan}</Text>
          </View>
          <View style={styles.viewText}>
            <Text>Địa chỉ</Text>
            <Text
              style={[styles.textPrimary, styles.wrapText, styles.addressText]}>
              {item?.diaChi}
            </Text>
          </View>
          <View style={styles.viewText}>
            <Text>Số điện thoại</Text>
            <Text style={styles.textPrimary}>{item?.sdt}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    justifyContent: 'space-between',
  },
  header: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    paddingHorizontal: 10,
    height: hp(40),
    justifyContent: 'space-between',
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  textPrimary: {
    color: 'black',
    fontWeight: 'bold',
  },
  wrapText: {
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  addressText: {
    width: '70%',
  },
});

export default KhachHangDetailScreen;