import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {appIcon} from '../../constants/appIcon';
import NavProps from '../../models/props/NavProps';
import SearchHeader from './../../component/search/searchHeader';
import {appFontSize} from '../../constants/appFontSizes';
import {appColors} from '../../constants/appColors';
import {Mon} from '../../models/Mon';
import Swiper from 'react-native-swiper';

const TrangChuScreen: React.FC<NavProps> = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const swiperRef = useRef<any>(null); 
  const [autoplay, setAutoplay] = useState(true); // State để điều khiển autoplay

  const openScreen = (screen: string) => {
    navigation.navigate(screen, {searchValue});
  };

  const data = [
    {
      id: 1,
      poster_path:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
    },
    {
      id: 2,
      poster_path:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
    },
    {
      id: 3,
      poster_path:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
    },
    {
      id: 4,
      poster_path:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
    },
  ];
  const dish: Mon[] = [
    {
      _id: '1',
      tenMon: 'Pizza hải sản',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTien: 100000,
      soLuong: 2,
    },
    {
      _id: '2',
      tenMon: 'Pizza gà',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTien: 300000,
    },
    {
      _id: '3',
      tenMon: 'Pizza bò',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTien: 200000,
    },

    {
      _id: '4',
      tenMon: 'Pizza cua',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTien: 500000,
    },

    {
      _id: '5',
      tenMon: 'Pizza rau cải',
      hinhAnh:
        'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      giaTien: 600000,
    },
  ];

  const handlePress = (item: any) => {
    console.log('item', item);
  };

  const renderItem = ({item}: {item: Mon}) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            source={
              !item?.hinhAnh || item?.hinhAnh === 'N/A'
                ? require('./../../assest/image/default-avatar.jpg')
                : {uri: item?.hinhAnh}
            }
            style={{
              width: 140,
              height: 135,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            resizeMode="cover"
            defaultSource={require('./../../assest/image/default-avatar.jpg')}
          />

          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {item?.tenMon}
          </Text>
          <Text style={{color: 'black'}}>
            {' '}
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(item?.giaTien ?? 0)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onScrollBeginDrag = () => {
    setAutoplay(false); // Tắt autoplay

  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewSearch}>
          <SearchHeader
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            searchAction={() => openScreen('SearchMonScreen')}
            navigation={navigation}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}>
 <Swiper
          ref={swiperRef}
          style={styles.wrapper}
          autoplay={autoplay} // Sử dụng state để điều khiển autoplay
          autoplayTimeout={5}
          onScrollBeginDrag={onScrollBeginDrag} // Tạm thời tắt tự động chuyển slide khi người dùng thao tác
        >
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(item)}>
              <View style={styles.slide}>
                <Image source={{ uri: item.poster_path }} style={styles.image} />
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
        </View>
      </View>
      <View style={styles.main}>
        <View style={{backgroundColor: appColors.white}}>
          <Text
            style={{
              fontSize: appFontSize.normal,
              fontWeight: '500',
              color: appColors.warmOrange,
              padding: 10,
            }}>
            Món bán chạy
          </Text>
          <FlatList
            horizontal={true}
            data={dish}
            renderItem={renderItem}
            keyExtractor={item => item._id || ''}
            style={{height: 200, marginTop: 10}}
            showsHorizontalScrollIndicator={false} // Tắt thanh cuộn ngang
            // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
            // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
            // onEndReachedThreshold={.1}
          />
        </View>

        <View style={{backgroundColor: appColors.white}}>
          <Text
            style={{
              fontSize: appFontSize.normal,
              fontWeight: '500',
              color: appColors.coolPurple,
              padding: 10,
            }}>
            Giải nhiệt mùa hè
          </Text>
          <FlatList
            horizontal={true}
            data={dish}
            renderItem={renderItem}
            keyExtractor={item => item._id || ''}
            style={{height: 200, marginTop: 10}}
            showsHorizontalScrollIndicator={false} // Tắt thanh cuộn ngang
            // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
            // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
            // onEndReachedThreshold={.1}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  viewSearch: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  main: {
    flex: 1.5,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: appColors.white,
    elevation: 4,
    paddingBottom: 20,
  },
  wrapper: {height: 200},
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default TrangChuScreen;
