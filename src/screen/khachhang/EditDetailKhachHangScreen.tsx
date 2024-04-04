import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  faShop,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColors} from '../../constants/appColors';
import ButtonComponent from '../../component/ButtonComponent';
import EditTextComponent from '../../component/EditTextComponent';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {getData} from '../../utils/storageUtils';
import ImagePickerComponent from '../../component/ImagePickerComponent';
import { appImageSize } from '../../constants/appImageSize';

const EditDetailKhachHangScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  
const dummyData = {
  tenNV: "TRAN XUAN DUC",
  gioiTinh: 2, // 2 for male, 1 for female
  taiKhoan: "ductxph29059@gmail.com",
  diaChi: "Vân canh, Hoài Đức, Nam Từ Liêm ",
  sdt: "0123456789",
  hinhAnh: "https://cdn-i.vtcnews.vn/files/ctv.giaoduc/2019/03/15/img-1329-1-0135095.jpg" // URL of the image
};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [status, setStatus] = useState<boolean>();
  const [item, setItem] = useState<any>(dummyData);

  // Declare the setLoading function using the useState hook
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleImageSelect = async (imagePath: string) => {
    try {
      setImagePath(imagePath);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Điều chỉnh vị trí của bàn phím
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          <View style={styles.footer}>
            <View style={{paddingTop:10}}>
             <EditTextComponent
              label="text"
              placeholder="Họ và tên"
              value={name}
              iconColor="gray"
              onChangeText={setName}
              icon={faShop}
            />
            </View>
           
            <View style={{paddingTop:10}}>
            <EditTextComponent
              label="text"
              placeholder="Số điện thoại"
              value={phone}
              iconColor="gray"
              onChangeText={setPhone}
              icon={faPhone}
            />
           </View>
           <View style={{paddingTop:10}}>
            <EditTextComponent
              label="text"
              placeholder="Địa chỉ"
              value={address}
              iconColor="gray"
              onChangeText={setAddress}
              icon={faLocationDot}
            />
           </View>
           <View style={{paddingTop:10}}>
            <ButtonComponent
              type="primary"
              text="Lưu"
              textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}
              // onPress={handelUpdate}
            />
          </View>
          </View>
          <AlertComponent
            visible={showAlert}
            message={msg}
            onClose={handleCloseAlert}
          />
          <LoadingComponent visible={loading ?? false} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: appColors.white,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'space-between',
  },
});

export default EditDetailKhachHangScreen;
