import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';

interface Props {
  leftText: string;
  rightText: string;
  leftColor?: string;
  rightColor?: string;
  backgroundColor?: string;
  showBorderBottom?: boolean;
  leftBold?: boolean,
  rightBold?: boolean
}

const TextViewComponent: React.FC<Props> = ({
  leftText,
  rightText,
  leftColor = appColors.text,
  rightColor = appColors.text,
  backgroundColor,
  showBorderBottom = true,
  leftBold = false,
  rightBold = false,
}) => {
  const containerStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: backgroundColor || 'transparent',
      borderBottomWidth: showBorderBottom ? 1 : 0,
      borderColor: appColors.boderColor,
      marginVertical: 5,
    },
    leftTextContainer: {
      flex: 0.5,
      justifyContent:'flex-start',
      alignItems: 'flex-start',
      fontSize: appFontSize.normal,
    },
    rightTextContainer: {
      flex: 1,
      justifyContent:'flex-end',
      alignItems:'flex-end',
      marginLeft: 10
    },
    leftText: {
      fontSize: appFontSize.normal,
      fontWeight: leftBold ?"bold":"normal",
      color: leftColor,
    },
    rightText: {
      fontSize: appFontSize.normal,
      fontWeight: rightBold ?"bold":"normal",
      color: rightColor,
    }
  });

  return (
    <View style={containerStyle.container}>
      <View style={containerStyle.leftTextContainer}><Text style={containerStyle.leftText}>{leftText}</Text></View>
      <View style={containerStyle.rightTextContainer}><Text style={containerStyle.rightText}>{rightText}</Text></View>
    </View>
  );
};

export default TextViewComponent;


