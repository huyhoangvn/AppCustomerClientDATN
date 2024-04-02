import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faShoppingCart, faSearch, faReceipt, faGift, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import NavProps from '../models/props/NavProps';
import TrangChuScreen from './trangchu/TrangChuScreen';
import GioHangScreen from './giohang/GioHangScreen';
import HoaDonScreen from './hoadon/HoaDonScreen';
import KhuyenMaiScreen from './khuyenmai/KhuyenMaiScreen';
import KhachHangDetailScreen from './khachhang/DetailKhachHangScreen';
import { appIcon } from '../constants/appIcon';
import { getData } from '../utils/storageUtils';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen: React.FC<NavProps> = ({ navigation,route } : any) =>  {

  const renderTabScreenOptions = (label: string, icon: IconProp) : any => ({
    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
      <FontAwesomeIcon icon={icon} size={focused ? appIcon.big : appIcon.normal} color={color} />
    ),
    tabBarLabel: label,
    headerShown: false, // Ẩn tiêu đề header
  });

  return (
    <Tab.Navigator
      theme={{ colors: { secondaryContainer: "white" }}}
      initialRouteName='MainCuaHangScreen'
      shifting={true}
      activeColor= {'#3D631A'}
      inactiveColor="white"
      
      barStyle={{ 
        backgroundColor: '#89b449', 
        elevation: 8,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
      }}
      >
      <Tab.Screen 
        name="TrangChuScreen" 
        component={TrangChuScreen} 
        options={renderTabScreenOptions('Trang Chủ', faHome)}
      />
      <Tab.Screen 
        name="KhuyenMaiScreen" 
        component={KhuyenMaiScreen} 
        options={renderTabScreenOptions('Ưu đãi', faGift)}
      />
      <Tab.Screen 
        name="GioHangScreen" 
        component={GioHangScreen} 
        options={renderTabScreenOptions('Giỏ Hàng', faShoppingCart)}
      />
      <Tab.Screen 
        name="HoaDonScreen" 
        component={HoaDonScreen} 
        options={renderTabScreenOptions('Hóa đơn', faReceipt)}
      />
      <Tab.Screen 
        name="KhachHangDetailScreen" 
        component={KhachHangDetailScreen} 
        options={renderTabScreenOptions('Tôi', faUser)}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    marginLeft: 15,
    marginRight: 15,
  }
});

export default HomeScreen;