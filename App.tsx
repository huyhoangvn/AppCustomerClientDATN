import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer, NavigationProp, DefaultTheme} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HeaderRightComponent from './src/component/options-menu/HeaderRightComponent';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SplashScreen from './src/screen/SplashScreen';
import { appColors } from './src/constants/appColors';
import {LogoNoText} from './src/assest/svgs/index';
import { View, Text } from 'react-native';
import { appFontSize } from './src/constants/appFontSizes';
import { useState, useEffect } from 'react';
import { getData } from './src/utils/storageUtils';

import RegisterScreen from './src/screen/register/RegisterScreen';
import ChangeMatKhauScreen from './src/screen/khachhang/ChangeMatKhauScreen';
import EditDetailKhachHangScreen from './src/screen/khachhang/EditDetailKhachHangScreen';
import DetailCuaHangScreen from './src/screen/trangchu/DetailCuaHangScreen';
import DetailMonScreen from './src/screen/trangchu/DetailMonScreen';
import SearchMonScreen from './src/screen/trangchu/SearchMonScreen';
import AddHoaDonScreen from './src/screen/giohang/AddHoaDonScreen';
import DetailHoaDonScreen from './src/screen/hoadon/DetailHoaDonScreen';
import DetailDatMonScreen from './src/screen/hoadon/DetailDatMonScreen';
import { text } from '@fortawesome/fontawesome-svg-core';
import VerificationScreen from './src/screen/register/VerificationScreen';
import ForGotPasswordScreen from './src/screen/ForGotPassword/ForGotPasswordScreen';
import NewPassScreen from './src/screen/ForGotPassword/NewPassScreen';

const CustomHeader: React.FC<{ title?: string }> = ({ title = 'Default Title' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <LogoNoText width={40} height={40} />
    <Text style={{ marginLeft: 10, fontSize: appFontSize.title, color: appColors.primary }}>{title}</Text>
  </View>
);

const Stack = createStackNavigator();

interface AppProps {}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    // card: appColors.primary
    // text: appColors.primary,
  },
};



const App: React.FC<AppProps> = () => {
  const [tenKH, setTenKH] = useState("Tên Khách hàng");

  useEffect(() => {
    getTenKh(); // Fetch tenKH when component mounts
  }, []); // Empty dependency array to run only once

  const getTenKh = async () => {
    const storedData = await getData();
    const storedTen = storedData?.tenKH;
    setTenKH(storedTen || "Tên Khách hàng");
  };

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <MenuProvider>
          <NavigationContainer
            theme={navTheme}
          >
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{headerTitleAlign: 'left'}}>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              {/* Đăng nhập và đăng ký */}
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: false}}
                // options={{title: 'Đăng ký'}}
              />
              <Stack.Screen
                name="VerificationScreen"
                component={VerificationScreen}
                options={{headerShown: false}}
                // options={{title: 'Đăng ký'}}
              />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForGotPasswordScreen}
                options={{headerShown: true, title: ''}}
                // options={{title: 'Đăng ký'}}
              />
              <Stack.Screen
                name="NewPassScreen"
                component={NewPassScreen}
                options={{headerShown: true, title: ''}}
                // options={{title: 'Đăng ký'}}
              />
              {/* Trang chủ với nav bar */}
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({navigation}) => ({
                  // title: 'Food Center',
                  headerRight: () => (
                    <HeaderRightComponent navigation={navigation} tenKH={tenKH}/>
                  ),
                  headerTitle: () => <CustomHeader title="Food Center"/>
                })}
              />
              {/* Khách hàng */}
              <Stack.Screen
                name="ChangeMatKhauScreen"
                component={ChangeMatKhauScreen}
                options={{title: 'Đổi mật khẩu'}}
              />
              <Stack.Screen
                name="EditDetailKhachHangScreen"
                component={EditDetailKhachHangScreen}
                options={{title: 'Sửa thông tin cá nhân'}}
              />
              {/* Tìm kiếm */}
              <Stack.Screen
                name="DetailCuaHangScreen"
                component={DetailCuaHangScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DetailMonScreen"
                component={DetailMonScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DetailMonScreenFromCuaHang"
                component={DetailMonScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SearchMonScreen"
                component={SearchMonScreen}
                options={{headerShown: false}}
              />
              {/* Hóa đơn */}
              <Stack.Screen
                name="AddHoaDonScreen"
                component={AddHoaDonScreen}
                options={{title: 'Tạo hóa đơn'}}
              />
              <Stack.Screen
                name="DetailHoaDonScreen"
                component={DetailHoaDonScreen}
                options={{title: 'Chi tiết hóa đơn'}}
              />
              <Stack.Screen
                name="DetailDatMonScreen"
                component={DetailDatMonScreen}
                options={{title: 'Chi tiết đặt món'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  touchableOpacity: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default App;
