import React, {useEffect, useRef, useState} from 'react';
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
import authenticationAPI from '../../apis/authApi';

const TrangChuScreen: React.FC<NavProps> = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const swiperRef = useRef<any>(null);
  const [autoplay, setAutoplay] = useState(true); // State để điều khiển autoplay
  const [typeDish1, setTypeDish1] = useState<Mon[]>([]);
  const [typeDish2, setTypeDish2] = useState<Mon[]>([]);
  const [dishTop, setDishTop] = useState<Mon[]>([]);
  const [loading, setLoading] = useState(false);
  const [nameTypeDish1, setNametypeDish1] = useState<string>();
  const [nameTypeDish2, setNametypeDish2] = useState<string>();

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
  // const dish: Mon[] = [
  //   {
  //     _id: '1',
  //     tenMon: 'Pizza hải sản',
  //     hinhAnh:
  //       'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
  //     giaTien: 100000,
  //     soLuong: 2,
  //   },
  //   {
  //     _id: '2',
  //     tenMon: 'Pizza gà',
  //     hinhAnh:
  //       'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
  //     giaTien: 300000,
  //   },
  //   {
  //     _id: '3',
  //     tenMon: 'Pizza bò',
  //     hinhAnh:
  //       'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
  //     giaTien: 200000,
  //   },

  //   {
  //     _id: '4',
  //     tenMon: 'Pizza cua',
  //     hinhAnh:
  //       'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
  //     giaTien: 500000,
  //   },

  //   {
  //     _id: '5',
  //     tenMon: 'Pizza rau cải',
  //     hinhAnh:
  //       'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
  //     giaTien: 600000,
  //   },
  // ];
  const getTypeDish = async (index: any) => {
    try {
      setLoading(true);
      if (index == 0) {
        const res: any = await authenticationAPI.HandleAuthentication(
          `/khachhang/mon/theo-loai-mon?indexLM=${index}`,
          {},
          'put',
        );
        if (res.success === true) {
          setTypeDish1(res.list);
          setNametypeDish1(res.tenLM);
        }
      } else {
        const res: any = await authenticationAPI.HandleAuthentication(
          `/khachhang/mon/theo-loai-mon?indexLM=${index}`,
          {},
          'put',
        );
        if (res.success === true) {
          setTypeDish2(res.list);
          setNametypeDish2(res.tenLM);
        }
      } // Set loading to true before making the API call
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getTopDish = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const res: any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/thongke/nam-tenLM`,
        'get',
      );
      if (res.success === true) {
        setDishTop(res.list);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item: any) => {
    console.log('item11111', item);
  };

  const onScrollBeginDrag = () => {
    setAutoplay(false); // Tắt autoplay
  };

  useEffect(() => {
    getTopDish();
    getTypeDish(0);
    getTypeDish(1);
  }, []);
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
        {dishTop &&
          dishTop.length > 0 && ( // Kiểm tra nếu dishTop tồn tại và có phần tử
            <View style={{backgroundColor: appColors.white}}>
              <FlatListHomeComponent
                data={dishTop}
                showIndicator={false}
                textTitle="Món bán chạy"
                textSeeMore="Xem thêm >"
                textTag="Món ngon"
                styleTag={{
                  color: appColors.warmOrange,
                  borderColor: appColors.warmOrange,
                }}
                styleTitle={{
                  color: appColors.warmOrange,
                }}
                onItemClick={(item: Mon) => {
                  navigation.navigate('DetailMonScreen', {idMon: item?._id});
                }}
                onSeeMoreClick={() => {

                }}
              />
            </View>
          )}

        {typeDish1 && typeDish1.length > 0 && (
          <View style={{backgroundColor: appColors.white}}>
            <FlatListHomeComponent
              data={typeDish1}
              showIndicator={false}
              textTitle={nameTypeDish1}
              textTag="Giải khát"
              textSeeMore="Xem thêm >"
              styleTitle={{
                color: appColors.coolPurple,
              }}
              onItemClick={(item: Mon) => {
                navigation.navigate('DetailMonScreen', {idMon: item?._id});
              }}
              onSeeMoreClick={() => {
                navigation.navigate('SearchMonScreen')
              }}
              styleTag={{
                color: appColors.coolPurple,
                borderColor: appColors.coolPurple,
              }}
            />
          </View>
        )}

        {typeDish2 && typeDish2.length > 0 && (
          <View style={{backgroundColor: appColors.white}}>
            <FlatListHomeComponent
              data={typeDish2}
              showIndicator={false}
              textTitle={nameTypeDish2}
              textTag="Giải khát"
              textSeeMore="Xem thêm >"
              styleTitle={{
                color: appColors.coolPurple,
              }}
              onItemClick={(item: Mon) => {
                navigation.navigate('DetailMonScreen', {idMon: item?._id});
              }}
              onSeeMoreClick={() => {

              }}
              styleTag={{
                color: appColors.coolPurple,
                borderColor: appColors.coolPurple,
              }}
            />
          </View>
        )}
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
