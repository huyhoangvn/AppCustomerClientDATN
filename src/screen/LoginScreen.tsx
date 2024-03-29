import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Image,
  Pressable,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NavProps from '../models/props/NavProps';

import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../component/EditTextComponent';
import ButtonComponent from '../component/ButtonComponent';
import {appColors} from '../constants/appColors';
import {Text} from 'react-native';
import TextComponent from '../component/TextComponent';
import authenticationAPI from '../apis/authApi';
import {useDispatch} from 'react-redux';
// import { addAuth, addToken } from '../redux/reducers/authReducers';
import {
  deleteData,
  getData,
  getToken,
  saveData,
  updateData,
} from '../utils/storageUtils';
import {deleteToken, setToken} from '../redux/reducers/authReducers';
import AlertComponent from '../component/AlertComponent';
import LoadingComponent from '../component/LoadingComponent';
import {LogoNoText} from '../assest/svgs/index';

const LoginScreen: React.FC<NavProps> = ({navigation}) => {
  var status: boolean | null | undefined;
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>();
  const [isRemember, setIsRemember] = useState(false);

  // console.log()

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleUserNameChange = (text: string) => {
    setUserName(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const rememBer = async (
    idUser: string,
    name: string,
  ) => {
    if (isRemember === true) {
      await saveData({
        taiKhoan: userName,
        matKhau: password,
        isChecked: true,
        idKH: idUser,
        tenKH: name,
      });
    } else {
      // console.log(idStore)

      await saveData({
        taiKhoan: userName,
        idKH: idUser,
        tenKH: name,
        isChecked: false,
      });
      await deleteData('matKhau');
    }
  };

  const getRemembered = async () => {
    try {
      const storedData = await getData();
      const storedUserName = storedData?.taiKhoan || '';
      const storedPassword = storedData?.matKhau || '';
      const storedChecked = storedData?.isChecked || false; // Sử dụng false nếu giá trị storedData?.isChecked là null hoặc undefined

      setUserName(storedUserName);
      setPassword(storedPassword);

      // Cập nhật trạng thái của checkbox
      if (storedChecked === true) {
        setUserName(storedUserName);
        setPassword(storedPassword);
        setIsRemember(true);
      } else {
        setUserName('');
        setPassword('');
        setIsRemember(false);
      }
    } catch (error) {
      console.error('Error retrieving remember me state:', error);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Bắt đầu hiển thị loading
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/auth',
        {taiKhoan: userName, matKhau: password},
        'post',
      );

      if (res.success === true) {
        const token = await getToken();
        dispatch(setToken(token));
        rememBer(
          res.index.id,
          res.index.tenKH
        ); // Truyền các đối số cần thiết vào hàm rememBer
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.'); // Set error message
      handleShowAlert(); // Show alert
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRemembered();
    // setRememberedChecked(true);
  }, []);

  return (
    <KeyboardAvoidingView 
    style={{flex: 1}} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Điều chỉnh khoảng cách giữa phần tử và bàn phím
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <LogoNoText />
        <Text style={styles.logoText}>Food Center</Text>
      </View>

      <View style={styles.main}>
        <EditTextComponent
          label="text"
          placeholder="Nhập tài khoản"
          value={userName}
          iconColor="gray"
          onChangeText={handleUserNameChange}
          icon={faUser}
        />

        <EditTextComponent
          label="pass"
          placeholder="Nhập mật khẩu"
          value={password}
          iconColor="gray"
          onChangeText={handlePasswordChange}
          icon={faLock}
        />
        <View style={styles.viewButton}>
          <View style={{flexDirection: 'row'}}>
            <Switch
              style={{paddingLeft: 10}}
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => {
                setIsRemember(!isRemember);
              }}
            />
            <TextComponent
              styles={{
                alignSelf: 'center',
                paddingLeft: 10,
                color: appColors.primary,
                fontWeight: 'bold',
              }}
              text="Nhớ mật khẩu"
              size={14}
            />
          </View>
          {/* <ButtonComponent
            type="link"
            text="Quên mật khẩu ?"
            onPress={() => navigation.navigate('SignUpScreen')}
            textStyles={{fontWeight: 'bold'}} // Cập nhật style ở đây
          /> */}
        </View>
        <ButtonComponent
          type="primary"
          text="Đăng nhập"
          textStyles={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.footer}>

        <View style={styles.signOut}>
          <TextComponent
            text="Bạn chưa có tài khoản?  "
            styles={{color: '#C2BEBE', fontSize: 16}}
          />
          <ButtonComponent
            type="link"
            text="Đăng ký"
            textStyles={{
              fontSize: 16,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}
          />
          <AlertComponent
            visible={showAlert}
            message={msg}
            onClose={handleCloseAlert}
          />
          <LoadingComponent visible={loading ?? false} />
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1.5,
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'center', // Căn giữa theo chiều dọc
  },
  main: {
    flex: 2,
    justifyContent: 'space-evenly', // Màu cho phần main
  },
  footer: {
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: appColors.primary,
    textAlign: 'center', // Căn giữa văn bản theo chiều ngang
  },
  viewButton: {
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 5,
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
