import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  iConStyles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disable?: boolean;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    textColor,
    textStyles,
    color,
    styles,
    onPress,
    iconFlex,
    type,
    disable,
    iConStyles,
  } = props;

  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color
              ? color
              : disable
              ? appColors.gray4
              : appColors.primary,
            marginBottom: 12,
            width: '95%',
          },
          styles,
        ]}>
        {icon && iconFlex === 'left' && <View style={iConStyles}>{icon}</View>}
        {/* <Text style={textStyles}>{text}</Text> */}

        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

          <TextComponent
            text={text}
            color={textColor ?? appColors.white}
            styles={[
              textStyles,
              {
                fontSize: 16,
                alignSelf: 'center',
              },
            ]}
          />
        </View>
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={textColor ?? appColors.primary}
        styles={[
          textStyles,
        ]}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
