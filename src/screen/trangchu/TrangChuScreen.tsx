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
import FlatListHomeComponent from '../../component/FlatListHomeComponent';

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
                  <Image
                    source={{uri: item.poster_path}}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </View>
      <View style={styles.main}>
        <View style={{backgroundColor: appColors.white}}>
          <FlatListHomeComponent
            data={dish}
            showIndicator={false}
            textTitle="Món bán chạy"
            textSeeMore='Xem thêm >'
            textTag="Món ngon"
            styleTag={{color: appColors.warmOrange,borderColor: appColors.warmOrange,}}
            styleTitle={{
              color: appColors.warmOrange,
            }}
          />
        </View>

        <View style={{backgroundColor: appColors.white}}>
          <FlatListHomeComponent
            data={dish}
            showIndicator={false}
            textTitle="Giải nhiệu mùa hè"
            textTag='Giải khát'
            textSeeMore='Xem thêm gì đó >'
            styleTitle={{
              color: appColors.coolPurple,
            }}
         
            styleTag = {{color: appColors.coolPurple,borderColor: appColors.coolPurple,}}
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
