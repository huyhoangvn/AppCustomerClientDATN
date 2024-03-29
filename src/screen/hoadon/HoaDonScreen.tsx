import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ListChoDuyetScreen from './ListChoDuyetScreen';
import { appColors } from '../../constants/appColors';
import { TabBarIndicator } from 'react-native-tab-view';
import ListChuanBiScreen from './ListChuanBiScreen';
import ListDangGiaoScreen from './ListDangGiaoScreen';
import ListThanhCongScreen from './ListThanhCongScreen';
import ListThatBaiScreen from './ListThatBaiScreen';
import ListTatCaScreen from './ListTatCaScreen';

const Tab = createMaterialTopTabNavigator();

const ListHoaDonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const renderTabScreenOptions = (label: string, icon?: IconProp) => ({
    tabBarIcon: icon ? ({ focused, color }: { focused: boolean; color: string }) => (
       <FontAwesomeIcon icon={icon} size={focused ? 24 : 20} color={color} />
    ) : undefined,
    tabBarLabel: label,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // Set tabBarScrollEnabled to true for scrollable tabs
        tabBarItemStyle: { width: 'auto' }, // Set tabBarItemStyle width to auto for scrollable tabs
        tabBarInactiveTintColor: "#929292",
        tabBarActiveTintColor: appColors.primary,
        tabBarIndicatorStyle : { backgroundColor: appColors.primary },
        tabBarLabelStyle: { fontWeight: 'bold', textTransform: 'capitalize' }, // Set textTransform to 'capitalize'
        tabBarStyle: { backgroundColor: '#ffffff' }
      }}
    >
      <Tab.Screen 
        name="ListTatCaScreen" 
        component={ListTatCaScreen} 
        options={renderTabScreenOptions('Tất cả'  )}
      />
      <Tab.Screen 
        name="ListChoDuyetScreen" 
        component={ListChoDuyetScreen} 
        options={renderTabScreenOptions('Chờ duyệt')}
      />
      <Tab.Screen 
        name="ListChuanBiScreen" 
        component={ListChuanBiScreen} 
        options={renderTabScreenOptions('Chuẩn bị')}
      />
      <Tab.Screen 
        name="ListDangGiaoScreen" 
        component={ListDangGiaoScreen} 
        options={renderTabScreenOptions('Đang giao')}
      />
      <Tab.Screen 
        name="ListThanhCongScreen" 
        component={ListThanhCongScreen} 
        options={renderTabScreenOptions('Thành công')}
      />
      <Tab.Screen 
        name="ListThatBaiScreen" 
        component={ListThatBaiScreen} 
        options={renderTabScreenOptions('Thất bại')}
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ListHoaDonScreen;