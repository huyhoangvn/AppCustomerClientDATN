import React from 'react';
import { Text } from 'react-native';
import { appFontSize } from '../../constants/appFontSizes';
import { appColors } from '../../constants/appColors';

const QuantityComponent = ({ label, soLuong }: any) => {
  // Kiểm tra nếu soLuong là null thì gán giá trị là 0

  return (
    <Text style={{ marginVertical: 5, fontSize: appFontSize.normal, color: appColors.text }}>
      {label} (<Text>{(soLuong)?soLuong:0}</Text>)
    </Text>
  );
};

export default QuantityComponent;

