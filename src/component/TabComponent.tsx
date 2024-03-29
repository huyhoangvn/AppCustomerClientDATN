import { View, Text, ScrollView, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
interface Props {
    items: [],
    stylesNew: StyleProp<ViewStyle>
  }
const TabComponent = (props: Props) => {
    const {items, stylesNew} = props;
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const handleSelectItem = (item: string | null) => {
        setSelectedItem(item);
        console.log('Selected item: ', item);
      };
  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false} // Tắt hiển thị thanh trượt ngang
    contentContainerStyle={[styles.scrollContainer,stylesNew]}
  >
    {items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.button,
          { backgroundColor: selectedItem === item ? appColors.primary : appColors.white }
        ]}
        onPress={() => handleSelectItem(item)}
      >
        <TextComponent 
        text= {item}
        styles = {[  { color: selectedItem === item ? appColors.white : '#ccc' }]}/>
      </TouchableOpacity>
    ))}
  </ScrollView>
  )
}
const styles = StyleSheet.create({
    
    scrollContainer: {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderColor: 'black'
  
    },
    button: {
      width: 118,
      borderRadius: 30,
      marginRight: 10,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
    },
  });
  

export default TabComponent