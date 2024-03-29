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
import RegisterScreen from './src/screen/register/RegisterScreen';
import KhachHangDetailScreen from './src/screen/khachhang/KhachHangDetailScreen';
import DoiMatKhauScreen from './src/screen/khachhang/DoiMatKhauScreen';
import { useState, useEffect } from 'react';
import { getData } from './src/utils/storageUtils';

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
              {/* Option menu trên header của trang home */}
              <Stack.Screen
                name="DoiMatKhauScreen"
                component={DoiMatKhauScreen}
                options={{title: 'Đổi mật khẩu'}}
              />
              <Stack.Screen
                name="KhachHangDetailScreen"
                component={KhachHangDetailScreen}
                options={{title: 'Thông tin khách hàng'}}
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
