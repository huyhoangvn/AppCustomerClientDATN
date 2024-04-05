import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { appColors } from '../constants/appColors';

interface AlertProps {
  visible: boolean;
  message: string;
  text?: string;
  label?: string;
  onClose: () => void;
  onBackToScreen?: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ visible, message, onClose, onBackToScreen,text,label }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:300,backgroundColor: 'white', padding: 22, borderRadius: 10}}>
          <Text style={{ fontSize: 20, fontWeight:"bold", color:'black'}}>Thông Báo</Text>  
          <Text style={{ fontSize: 14 , paddingTop: 5,color:'black'}}>{message}</Text>
          <View style = {{flexDirection: 'row', alignSelf: 'flex-end'}}>
          {
            label === 'backScreen' ? (
            <TouchableOpacity onPress={onBackToScreen} style={{ paddingTop: 10}}>
            <Text style={{ color: appColors.primary, fontSize: 16, fontWeight:'bold'}}>{text}</Text>
            </TouchableOpacity>
            ): null
          }
          <TouchableOpacity onPress={onClose} style={{ paddingTop: 10, paddingLeft: 20}}>
            <Text style={{ color: appColors.primary, fontSize: 16, fontWeight:'bold'}}>Huỷ</Text>
          </TouchableOpacity>
       
          </View>
       
        
        </View>
      </View>
    </Modal>
  );
};

export default AlertComponent;
