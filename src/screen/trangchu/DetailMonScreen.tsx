import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './../../component/detail/Header'; // Import the Header component
import { appColors } from '../../constants/appColors';

const DetailMonScreen = ({ navigation } : any) =>  {
  const route: any = useRoute();
  const [idMon, setIdMon] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(require('./../../assest/image/default-image.jpg')); // Default image path

  useEffect(() => {
    const value = route.params?.idMon || "";
    setIdMon(value);
  }, []);

  const goBackEvent = () => {
    navigation.goBack();
  };

  // Di chuyển qua màn hình chi tiết cửa hàng
  const openSearchScreen = (idCH: string) => {
    navigation.navigate('DetailCuaHangScreen', {
      idCH: idCH,
    });
  };

  return (
    <View style={styles.container}>
      <Header backgroundImageUrl={backgroundImage} goBackEvent={goBackEvent} />

      <Text style={{ color: appColors.coolPurple }}>{idMon}</Text>
      <TouchableOpacity onPress={()=>openSearchScreen("idCH")}>
        <Text style={{ color: appColors.red }}>Chi tiết cửa hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default DetailMonScreen;
