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

const EditDetailKhachHangScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  
  const {item} =  route.params;
  const [tenKH, setKH] = useState(item.tenKH);
  const [sdt, setSdt] = useState(item.sdt);
  const [diaChi, setAddress] = useState(item.diaChi);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [imagePath, setImagePath] = useState('');

  // Declare the setLoading function using the useState hook
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handelUpdateKhachHang = async () => {
    setLoading(true);
    try {
      const user = await getData();
      const idKH = user?.idKH;

      const formData = new FormData();
      if (imagePath) {
        formData.append('hinhAnh', {
          uri: imagePath,
          name: generateRandomImageName(), // Tên của hình ảnh
          type: 'image/jpeg', // Loại của hình ảnh
        });
      }
      formData.append('tenKH', tenKH);
      formData.append('diaChi', diaChi);
      formData.append('sdt', sdt);
      console.log('zzzzzzzzzzzzz');

      const res:any = await authenticationAPI.HandleAuthentication(
        `/khachhang/${idKH}`,
        formData,
        'put',
      );

      if (res.success === true) {
        setMsg(res.msg);
        handleShowAlert();
      } else {
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Thất bại.'); // Set error message
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };


  const generateRandomImageName = () => {
    const prefix = 'IMG_6314_'; // Tiền tố cố định
    const randomSuffix = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
    const extension = '.jpeg'; // Phần mở rộng của tệp
    return `${prefix}${randomSuffix}${extension}`;
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
        <View style={styles.main}>
          <ImagePickerComponent
            onImageSelect={handleImageSelect}
            imageUri={item.hinhAnh}
            style={{borderRadius: wp(25), overflow: 'hidden'}}
          />

          {/* <Image
        style={{width: wp(40), height: hp(20), borderRadius: 5}}
        source={{
          uri: item.hinhAnh,
        }}
      /> */}
        </View>
        <View style={styles.footer}>
          <EditTextComponent
            label="text"
            placeholder="Họ và tên"
            value={tenKH}
            iconColor="gray"
            onChangeText={setKH}
            icon={faShop}
          />

          <EditTextComponent
            label="text"
            placeholder="Số điện thoại"
            value={sdt}
            iconColor="gray"
            onChangeText={setSdt}
            icon={faPhone}
          />

          <EditTextComponent
            label="text"
            placeholder="Địa chỉ"
            value={diaChi}
            iconColor="gray"
            onChangeText={setAddress}
            icon={faLocationDot}
          />
          <ButtonComponent
            type="primary"
            text="Lưu"
            textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={handelUpdateKhachHang}
          />
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
    flex: 1,
    backgroundColor: appColors.white,
  },
  main: {
    height: hp(33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: hp(40),
    justifyContent: 'space-between',
  },
});

export default EditDetailKhachHangScreen;
