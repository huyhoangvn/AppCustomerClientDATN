import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavProps from '../../models/props/NavProps';
import {
  faShop,
  faPhone,
  faLocationDot,
  faUser,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AlertComponent from '../../component/AlertComponent';
import ButtonComponent from '../../component/ButtonComponent';
import EditTextComponent from '../../component/EditTextComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {appColors} from '../../constants/appColors';
import {showAlert} from '../../utils/showAlert';
import {useSelector} from 'react-redux';
import TextComponent from '../../component/TextComponent';
import authenticationAPI from '../../apis/authApi';

const RegisterScreen: React.FC<NavProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRepass] = useState('');
  const [isChecked, setChecked] = useState<boolean>();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [idStore, setIdStore] = useState('');
  // const storeData = useSelector(getDataStore);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const validateInputs = () => {
    if (!name.trim()) {
      return 'Vui lòng nhập họ và tên';
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      return 'Vui lòng nhập số điện thoại hợp lệ (10 số)';
    }

  
    if (!userName.trim() || !/^\S+@\S+\.\S+$/.test(userName.trim())) {
      return 'Vui lòng nhập email hợp lệ';
    }

    if (!pass.trim()) {
      return 'Vui lòng nhập mật khẩu';
    }

    if (pass.trim() !== rePass.trim()) {
      return 'Mật khẩu nhập lại không khớp với mật khẩu ban đầu';
    }

    if (!isChecked) {
      return 'Vui lòng đồng ý với điều khoản dịch vụ';
    }

    return null;
  };

  const sendCode = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setMsg(errorMessage);
      handleShowAlert();
      return;
    }

    try {
      setIsLoading(true); // Bắt đầu hiển thị màn hình loading
      const res = await authenticationAPI.HandleAuthentication(
        '/khachhang/verification',
        {
          email: userName,
        },
        'post',
      );

      // Dừng hiển thị màn hình loading sau 1 giây (hoặc sau khi nhận được dữ liệu)
      if (res.success === true) {
        setIsLoading(false);
        navigation.navigate('VerificationScreen', {
          name: name,
          phone: phone,
          email: userName,
          pass: pass,
          code: res.data.code,
        });
      } else {
        setIsLoading(false);
        setMsg('email lỗi hoặc trống');
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      // Xử lý lỗi khi gửi yêu cầu ở đây
    }
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -20} // Điều chỉnh khoảng cách giữa phần tử và bàn phím
    style={styles.container}
    >
   <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} // Ensure that the ScrollView fills the available space
        keyboardShouldPersistTaps="handled">
              <View style={styles.header}>
        <TextComponent
          text="Đăng Ký"
          size={20}
          styles={{fontWeight: 'bold', textAlign: 'center'}}
        />
        <TextComponent
          text="Nhập thông tin cá nhân"
          size={14}
          styles={{fontWeight: 'bold', textAlign: 'center'}}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.viewEditTex}>
          <EditTextComponent
            label="text"
            placeholder="Họ và tên"
            value={name}
            iconColor="gray"
            onChangeText={setName}
            icon={faShop}
          />

          <EditTextComponent
            label="number"
            placeholder="Số điện thoại"
            value={phone}
            iconColor="gray"
            onChangeText={setPhone}
            icon={faPhone}
          />
          <EditTextComponent
            label="text"
            placeholder="Email"
            value={userName}
            iconColor="gray"
            onChangeText={setUserName}
            icon={faUser}
          />

          <EditTextComponent
            label="pass"
            placeholder="Nhập mật khẩu"
            value={pass}
            iconColor="gray"
            onChangeText={setPass}
            icon={faLock}
          />

          <EditTextComponent
            label="pass"
            placeholder="Nhập lại mật khẩu"
            value={rePass}
            iconColor="gray"
            onChangeText={setRepass}
            icon={faLock}
          />
        </View>
        <View style={styles.viewButton}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: ' black',
              paddingTop: 5,
              paddingBottom: 5,
              flex: 1,
              alignItems: 'center',
            }}>
            <BouncyCheckbox
              size={20}
              fillColor={appColors.primary}
              unfillColor="#FFFFFF"
              text="Tôi đồng ý với "
              innerIconStyle={{borderWidth: 1.5}}
              textStyle={{
                textDecorationLine: 'none',
                color: 'black',
                fontSize: 14,
              }}
              isChecked={isChecked}
              onPress={(isChecked: boolean) => {
                setChecked(isChecked);
              }}
              // onPress={handelCheked}
              style={{paddingLeft: 15}}
            />
            <ButtonComponent
              type="link"
              text="điều khoản dịch vụ"
              textStyles={{
                fontSize: 14,
                textDecorationLine: 'underline',
              }}
            />
          </View>

          <ButtonComponent
            type="primary"
            text="Hoàn tất đăng ký"
            textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={() => {
              sendCode();
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.signOut}>
          <TextComponent
            text="Đã có tài khoản "
            styles={{color: 'black', fontSize: 18}}
          />
          <ButtonComponent
            type="link"
            text="Đăng nhập"
            textStyles={{
              fontSize: 18,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
          />
        </View>
        <AlertComponent
          visible={showAlert}
          message={msg}
          onClose={handleCloseAlert}
        />
        <LoadingComponent visible={isLoading} />
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 2,
    justifyContent: 'space-between',
        // backgroundColor: 'black'

  },
  viewEditTex: {
    flex: 2,
    justifyContent: 'space-between',
    // backgroundColor: 'black'
  },
  viewButton: {
    flex: 1,
    // backgroundColor: 'black',
  },
  footer: {
    flex: 1,
    // backgroundColor: 'black'
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
