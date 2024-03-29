import { View, Text } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import TextComponent from './TextComponent';
const appPath = () => {
  return (
    <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
                width: wp(80)
              }}>

              <View
                style={{
                  backgroundColor: '#C2BEBE',
                  width: wp(40),
                  height: 1,
                  marginTop: 2,
                }} />

              <View style={{ height: hp(3), justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                <TextComponent
                  text='Or'
                  size={15}
                  color='#C2BEBE'
                />
              </View>

              <View
                style={{
                  marginTop: 2,
                  backgroundColor: '#C2BEBE',
                  width: wp(40),
                  height: 1,
                }} />
            </View>
  )
}

export default appPath