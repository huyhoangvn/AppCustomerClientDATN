import React from 'react';
import { Text } from 'react-native';
import { appFontSize } from '../../constants/appFontSizes';
import { appColors } from '../../constants/appColors';

const QuantityComponent = ({ label, soLuong }: any) => {
  return (
    <Text style={{ marginVertical: 5, fontSize: appFontSize.normal, color: appColors.text }}>
      {label} (<Text>{soLuong}</Text>)
    </Text>
  );
};

export default QuantityComponent;

