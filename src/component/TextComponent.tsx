import React from 'react';
import { Text, StyleProp, TextStyle, View } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface Props {
  text: string;
  color?: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
  numberOfLines?: number;
  icon?: IconProp;
  iconColor?: string;
  marginLeft?: number;
  textAlign?: 'left' | 'center' | 'right'; // Thêm textAlign vào Props
  fontFamily?: string; // Thêm fontFamily vào Props
  marginTop?: number;
}

const TextComponent = (props: Props) => {
  const { text, size, color, styles, numberOfLines, icon, iconColor, marginLeft,marginTop, textAlign, fontFamily } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          color={iconColor ?? appColors.text}
          style={{ marginRight: 5, marginLeft: marginLeft }}
        />
      )}
      <Text
        numberOfLines={numberOfLines}
        style={[
          globalStyles.text,
          {
            color: color ?? appColors.text,
            fontSize: size ?? 16,
            marginLeft: marginLeft ?? 0,
            marginTop: marginTop ?? 0,

            textAlign: textAlign ?? 'left', // Sử dụng textAlign nếu được cung cấp, nếu không, sử dụng giá trị mặc định là 'left'
            fontFamily: fontFamily ?? 'Inter', // Sử dụng fontFamily nếu được cung cấp, nếu không, sử dụng giá trị mặc định là 'Arial'
          },
          styles,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default TextComponent;
