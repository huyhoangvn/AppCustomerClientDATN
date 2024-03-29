import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { appColors } from '../constants/appColors';

interface AlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ visible, message, onClose }) => {
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
          <TouchableOpacity onPress={onClose} style={{ paddingTop: 10, alignItems: 'flex-end'}}>
            <Text style={{ color: appColors.primary, fontSize: 16, fontWeight:'bold'}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertComponent;
