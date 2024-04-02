import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AddHoaDonScreen = () => {
  const route : any = useRoute();

  // Truy cập các tham số từ đối tượng route
  const { saveList } = route.params;

  useEffect(()=>{
    console.log(saveList)
  })

  // Bạn có thể sử dụng các tham số này trong màn hình của mình
  return (
    <View>
      {/* Sử dụng saveList ở đây theo nhu cầu của bạn */}
    </View>
  );
};

export default AddHoaDonScreen;
