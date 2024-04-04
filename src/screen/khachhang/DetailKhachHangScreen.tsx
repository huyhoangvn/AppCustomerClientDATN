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



const dummyData = {
  success: true,
  index: 
    {
      tenKH: "TRAN XUAN DUC",
      gioiTinh: 2, // 2 for male, 1 for female
      taiKhoan: "ductxph29059@gmail.com",
      diaChi: "Vân canh, Hoài Đức, Nam Từ Liêm ",
      sdt: "0123456789",
      hinhAnh: "https://cdn-i.vtcnews.vn/files/ctv.giaoduc/2019/03/15/img-1329-1-0135095.jpg" // URL of the image
    },
   
  count: 3,
  msg: ""
}

const KhachHangDetailScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [tenKH, setTenKH] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [sdt, setSdt] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [item, setItem] = useState<any>(dummyData);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [data , setData] = useState('');
  const openDoiMatKhauScreen = () => {
    navigation.navigate("ChangeMatKhauScreen");
  };

  const openEditDetailKhachHangScreen = () => {
    navigation.navigate("EditDetailKhachHangScreen");
  };
  const getDetail = async () => {
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/khachhang' + "/" + id,
      //   'get',
      // );
      const res : any = dummyData
      console.log(res);
     
      if (res.success === true) {
        const { index } = res;
        setTenKH(index.tenKH);
        setGioiTinh(index.gioiTinh);
        setTaiKhoan(index.taiKhoan); //
        setSdt(index.sdt); //
        setDiaChi(index.diaChi); //

        console.log(index.tenKH)
      }
    } catch (e) {
      console.log(e);
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
            style={{ width: appImageSize.size100.width, height: appImageSize.size100.height, borderRadius: 50 }}
            defaultSource={require('./../../assest/image/default-avatar.jpg')}
          />  
        </View>
        <View style={styles.main}>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Tên"
            rightText={tenKH}
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
            rightText=  {taiKhoan}
            leftBold={true}
            showBorderBottom={false}
          /> 
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Địa chỉ"
            rightText=  {diaChi}
            leftBold={true}
            showBorderBottom={false}
          /> 
           
          </View>
          <View style={styles.viewText}>
          <TextViewComponent
            leftText="Số điện thoại"
            rightText=  {sdt}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  header: {
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    justifyContent: 'space-between',
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
 
 
});

export default KhachHangDetailScreen;