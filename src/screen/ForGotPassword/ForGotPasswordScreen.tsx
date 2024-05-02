import {View, Text, StyleSheet, Linking} from 'react-native';
import React, { useState } from 'react';
import TextComponent from '../../component/TextComponent';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import EditTextComponent from '../../component/EditTextComponent';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Button from '../../component/Button';
import ButtonComponent from '../../component/ButtonComponent';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import NavProps from '../../models/props/NavProps';

const ForGotPasswordScreen: React.FC<NavProps> = ({navigation}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>();
    const [isRemember, setIsRemember] = useState(false);
  
    const validateInputs = () => {
    
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
          return 'Vui lòng nhập địa chỉ email hợp lệ';
        }
        return null;
      };
    
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };
  
   const finAccount = async () => {
    try {
        setLoading(true); // Bắt đầu hiển thị loading
        const res : any = await authenticationAPI.HandleAuthentication(
          `/verification/find-account/${email}`,
          null,
          'post',
        );
  
        if (res.success === true) {
            const resultVerification:any = await authenticationAPI.HandleAuthentication(
              '/verification',
              {
                email: email,
              },
              'post',
            );
            if(resultVerification.success === true){
            navigation.navigate('VerificationScreen',{status: 'forgot', id: res.id, email: email,code: resultVerification.data.code});
          }
        } else {
          setMsg(res.msg);
          handleShowAlert();
        }
      } catch (err) {
        // console.error(err);
        setMsg('Request timeout. Please try again later.'); // Set error message
        handleShowAlert(); // Show alert
      } finally {
        setLoading(false);
      }
    }

    const handleContinue= () => {
       const errorMessage = validateInputs();
        if (errorMessage) {
          setMsg(errorMessage);
          handleShowAlert();
          return;
        }
        finAccount()
    }
  return (
    <View style={styles.container}>
      <View style = {styles.main}>
        <TextComponent text='Tìm tài khoản' size={appFontSize.title} styles = {{ fontWeight: 'bold'}}/>
        <TextComponent text='Nhập địa chỉ email của bạn.' size={appFontSize.normal} />
        <EditTextComponent
          label="text"
          placeholder="Email"
          iconColor="gray"
          icon={faEnvelope}
          stylesContainer = {{marginTop: 20}}
          onChangeText={(text) => {setEmail(text)}}
          value={email}
          />
          <ButtonComponent
          type="primary"
          text="Tiếp tục"
          textStyles={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
          styles= {{marginTop: 20}}
          onPress={handleContinue}
        />
      </View>
      <AlertComponent
            visible={showAlert}
            message={msg}
            onClose={handleCloseAlert}
          />
          <LoadingComponent visible={loading ?? false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  main :{
    flex: 1,
  }
});

export default ForGotPasswordScreen;
