import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './../../component/detail/Header'; // Import the Header component
import { appColors } from '../../constants/appColors';

const DetailMonScreen = ({ navigation } : any) =>  {
  const route: any = useRoute();
  const [idCH, setIdCH] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(require('./../../assest/image/default-image.jpg')); // Default image path

  useEffect(() => {
    const value = route.params?.idCH || "";// Lấy thông tin tìm kiếm từ bên trang chủ
    setIdCH(value);
  }, []);

  return (
    <View style={styles.container}>
      <Header backgroundImageUrl={backgroundImage} color={appColors.white}/>
      <Text style={{ color: appColors.coolPurple }}>{idCH}</Text>
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
