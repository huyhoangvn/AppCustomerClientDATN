import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import NavProps from '../../models/props/NavProps';
import TextComponent from '../../component/TextComponent';
import {TextInput} from 'react-native-gesture-handler';
import {appColors} from '../../constants/appColors';
import ButtonComponent from '../../component/ButtonComponent';
import {ArrowRight} from '../../assest/svgs';
import {globalStyles} from '../../styles/globalStyles';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
const VerificationScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const {name, phone, email, pass, code, status, id} = route?.params || {};
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [label, setLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const hanDelBackToScreen = () => {
    setShowAlert(false);
    navigation.navigate('LoginScreen');
  };

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const saveUser = async () => {
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        '/khachhang/dang-ky',
        {
          taiKhoan: email,
          matKhau: pass,
          tenKH: name,
          sdt: phone,
        },
        'post',
      );

      if (res.success === true) {
        setMsg(res.msg);
        setLabel('backScreen');
        handleShowAlert();
      } else {
        setMsg(res.msg);
        setLabel('backScreen');
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const forGotPass = () => {
    navigation.navigate('NewPassScreen',{id: id});
  };

  const handleChangeVerification = () => {
    switch (status) {
      case 'register':
        if (
          parseInt(newCode) === parseInt(code) ||
          parseInt(newCode) === parseInt(currentCode)
        ) {
          saveUser();
        } else {
          setLabel('');
          setMsg('mã không đúng hoặc k hợp lệ');
          handleShowAlert();
        }
        break;
      case 'forgot':
        if (
          parseInt(newCode) === parseInt(code) ||
          parseInt(newCode) === parseInt(currentCode)
        ) {
          forGotPass();
        } else {
          setLabel('');
          setMsg('mã không đúng hoặc k hợp lệ');
          handleShowAlert();
        }
        break;
    }
    // if (parseInt(newCode) === parseInt(code) || parseInt(newCode) ===  parseInt(currentCode))
    // {
    //   saveUser();
    // } else {
    //   setLabel('')
    //   setMsg('mã không đúng hoặc k hợp lệ');
    //   handleShowAlert();
    // }
  };
  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/khachhang/verification',
        {email},
        'post',
      );

      setLimit(120);
      setCurrentCode(res.data.code);
    } catch (error) {
      console.log(`Can not send verification code ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonComponent
          type="link"
          text="Quay lại"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.viewText}>
          <TextComponent
            text="Xác minh"
            size={35}
            styles={{fontWeight: '500', paddingBottom: 10}}
          />
          <TextComponent
            size={14}
            text={`Vui lòng nhập mã xác minh được gửi tới:  ${email.replace(
              /.{1,5}/,
              (m: any) => '*'.repeat(m.length),
            )}`}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
            // onChange={() => }
            placeholder="-"
          />
          <TextInput
            ref={ref2}
            value={codeValues[1]}
            keyboardType="number-pad"
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            value={codeValues[2]}
            ref={ref3}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ButtonComponent
          disable={newCode.length !== 4}
          //   onPress={handleVerification}
          text="Continue"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {marginLeft: -25, padding: 5},
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight />
            </View>
          }
          onPress={handleChangeVerification}
        />
        {limit > 0 ? (
          <>
            <TextComponent
              text="Gửi lại code sau"
              flex={0}
              styles={{textAlign: 'center'}}
            />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
              styles={{textAlign: 'center'}}
            />
          </>
        ) : (
          <ButtonComponent
            type="link"
            text="Gửi lại code"
            onPress={handleResendVerification}
          />
        )}
      </View>
      <LoadingComponent visible={isLoading} />
      <AlertComponent
        label={label}
        text="Login"
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
        onBackToScreen={hanDelBackToScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
    flex: 1,
  },

  header: {
    flex: 1,
  },
  main: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  viewInput: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewText: {},
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
  },
  footer: {
    flex: 5,
    alignItems: 'center',
  },
});

export default VerificationScreen;
