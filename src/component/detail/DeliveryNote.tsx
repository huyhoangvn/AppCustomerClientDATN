import React from 'react';
import { View, Text } from 'react-native';
import { Delivery } from '../../assest/svgs';
import { appColors} from '../../constants/appColors';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';

const DeliveryNote = ({ deliveryText, deliveryTime, backgroundColor }: any) => {
    return (
      <View style={{backgroundColor: backgroundColor || appColors.secondary, padding: 10, flexDirection: 'row', borderRadius: 12, margin: 5}}>
        <Delivery
          width={appImageSize.size50.width} 
          height={appImageSize.size50.height} 
        />
        <View style={{marginLeft: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: appFontSize.normal, color: 'black'}}>{deliveryText}</Text>
          <Text style={{fontSize: appFontSize.normal, color: 'black'}}>Dự kiến giao lúc {deliveryTime} phút từ khi đặt hàng</Text>
        </View>
      </View>
    );
  }

export default DeliveryNote;
