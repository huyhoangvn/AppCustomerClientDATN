import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { appColors } from '../../constants/appColors';
import GoiYKhuyenMaiScreen from './GoiYKhuyenMaiScreen';
import CuaBanKhuyenMaiScreen from './CuaBanKhuyenMaiScreen';

const Tab = createMaterialTopTabNavigator();

const KhuyenMaiScreen = () => {

  const renderTabScreenOptions = (label: string, icon?: IconProp) => ({
    tabBarIcon: icon ? ({ focused, color }: { focused: boolean; color: string }) => (
       <FontAwesomeIcon icon={icon} size={focused ? 24 : 20} color={color} />
    ) : undefined,
    tabBarLabel: label,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "#929292",
        tabBarActiveTintColor: appColors.primary,
        tabBarIndicatorStyle : { backgroundColor: appColors.primary },
        tabBarLabelStyle: { fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarStyle: { backgroundColor: '#ffffff' }
      }}
    >
      <Tab.Screen 
        name="CuaBanKhuyenMaiScreen" 
        component={CuaBanKhuyenMaiScreen} 
        options={renderTabScreenOptions('Gợi ý')}
      />
      <Tab.Screen 
        name="GoiYKhuyenMaiScreen" 
        component={GoiYKhuyenMaiScreen} 
        options={renderTabScreenOptions('Của bạn')}
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

export default KhuyenMaiScreen;