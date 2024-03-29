import {View, Text, Modal, ActivityIndicator, TextComponent} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingComponent = (props: Props) => {
  const {visible, mess} = props;

  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={appColors.primary} size={40} />
        <Text style = {{color: appColors.white, fontSize: 14}}>Đang tải</Text>
        {/* <Text</Text>
        <TextComponent text="Loading" flex={0} color={'#ffffff'} /> */}
      </View>
    </Modal>
  );
};

export default LoadingComponent;
