import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import NavProps from '../../models/props/NavProps';
import {appColors} from '../../constants/appColors';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import EditTextComponent from '../../component/EditTextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import authenticationAPI from '../../apis/authApi';
import { ScrollView } from 'react-native-gesture-handler';

const NewPassScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const id = route.params.id;
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState<boolean>();

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigation.navigate('LoginScreen');
  };

  const validateInputs = () => {
    if (!newPass.trim()) {
      return 'Vui lòng nhập mật khẩu';
    }

    if (newPass.length < 6 && newPass.length >= 15) {
      return 'Vui long nhập mật khẩu từ 6 đến 15 ký tự';
    }

    if (newPass.trim() !== reNewPass.trim()) {
      return 'Mật khẩu nhập lại không khớp với mật khẩu ban đầu';
    }

    return null;
  };
  const handelSave = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setMsg(errorMessage);
      handleShowAlert();
      return;
    }
    try {
      setLoading(true);
      const res: any = await authenticationAPI.HandleAuthentication(
        `/verification/forgot-password/${id}`,
        {
          matKhau: newPass,
        },
        'put',
      );
      if (res.success === true) {
        setMsg('Đổi mật khẩu thành công');
        handleShowAlert()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.editContainer}>
        <EditTextComponent
          label="pass"
          placeholder="Nhập mật khẩu mới"
          value={newPass}
          iconColor="gray"
          onChangeText={setNewPass}
          icon={faLock}
        />
        <EditTextComponent
          label="pass"
          placeholder="Nhập lại mật khẩu mới"
          value={reNewPass}
          iconColor="gray"
          onChangeText={setReNewPass}
          icon={faLock}
        />
      </View>
      <View style={styles.containerButton}>
        <ButtonComponent
          type="primary"
          text="Lưu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={handelSave}
        />
      </View>
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
      <LoadingComponent visible={loading ?? false} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  editContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  containerButton: {
    marginTop: 10,
    flex: 4,
  },
});

export default NewPassScreen;
