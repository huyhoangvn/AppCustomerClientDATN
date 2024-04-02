import React from 'react';
import { View, Text } from 'react-native';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import { appImageSize } from '../../constants/appImageSize';

const DeliveryNote = ({ title, mainText, backgroundColor, textBefore, textAfter, icon }: any) => {
  return (
    <View style={{ backgroundColor: backgroundColor || appColors.secondary, padding: 10, flexDirection: 'row', borderRadius: 12, margin: 5, alignItems: 'center' }}>
      {icon && React.cloneElement(icon, { width: appImageSize.size50.width, height: appImageSize.size50.height})}
      <View style={{ marginLeft: 10, flex: 1}}>
        <Text style={{ fontWeight: 'bold', fontSize: appFontSize.normal, color: 'black' }}>{title}</Text>
        {mainText && (
          <Text style={{ fontSize: appFontSize.normal, color: 'black' }}>
            {textBefore}{mainText}{textAfter}
          </Text>
        )}
      </View>
    </View>
  );
}

export default DeliveryNote;

