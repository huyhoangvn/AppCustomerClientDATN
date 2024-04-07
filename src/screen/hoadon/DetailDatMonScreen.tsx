import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {appFontSize} from '../../constants/appFontSizes';
import {Mon} from '../../models/Mon';
import {MonDat} from '../../models/MonDat';

const DetailDatMonScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  // const {dish} = route.params;

  const dish: MonDat[] = [
    {
      _id: '1',
      tenMon: 'Pizza hải sản',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTienDat: 100000,
      soLuong: 2,
    },
    {
      _id: '2',
      tenMon: 'Pizza gà',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTienDat: 300000,
      soLuong: 3,
    },
    {
      _id: '3',
      tenMon: 'Pizza bò',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTienDat: 200000,
      soLuong: 4,
    },

    {
      _id: '4',
      tenMon: 'Pizza cua',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTienDat: 500000,
      soLuong: 5,
    },

    {
      _id: '5',
      tenMon: 'Pizza rau cải',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTienDat: 600000,
      soLuong: 9,
    },
  ];

  const renderItem = ({item}: {item: MonDat}) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            source={
              !item?.hinhAnh || item?.hinhAnh === 'N/A'
                ? require('../../assest/image/default-avatar.jpg')
                : {uri: item?.hinhAnh}
            }
            style={{width: 65, height: 65, borderRadius: 10}}
            defaultSource={require('../../assest/image/default-avatar.jpg')}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {item?.tenMon}
            </Text>
            <Text style={{color: 'black'}}>
              Giá bán:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(item?.giaTienDat ?? 0)}
            </Text>
            <Text style={{color: 'black'}}>Số lượng: {item?.soLuong}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: appFontSize.normal,
          }}>
          Số món đặt (5)
        </Text>
      </View>
      <View style={styles.main}>
        <FlatList
          data={dish}
          renderItem={renderItem}
          keyExtractor={item => item._id || ''}
          // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
          // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
          // onEndReachedThreshold={.1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  main: {
    flex: 23,
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default DetailDatMonScreen;
