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
import {useIsFocused} from '@react-navigation/native';
import LoadingComponent from '../../component/LoadingComponent';

const TrangChuScreen: React.FC<NavProps> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const swiperRef = useRef<any>(null);
  const [autoplay, setAutoplay] = useState(true); // State để điều khiển autoplay
  const [typeDish1, setTypeDish1] = useState<Mon[]>([]);
  console.log("🚀 ~ typeDish1:", typeDish1)
  const [typeDish2, setTypeDish2] = useState<Mon[]>([]);
  console.log("🚀 ~ typeDish2:", typeDish2)
  const [dishTop, setDishTop] = useState<Mon[]>([]);
  const [loading, setLoading] = useState(false);
  const [nameTypeDish1, setNametypeDish1] = useState<string>();
  const [nameTypeDish2, setNametypeDish2] = useState<string>();
  const [imageSlide, setImageSlide] = useState<string[]>([]);

  const openScreen = (screen: string) => {
    navigation.navigate(screen, {search: search});
  };

  const data = [
    {
      id: 1,
      imgSlide: 'https://toplist.vn/images/200px/do-do-tiem-ga-ran-516483.jpg',
    },
    {
      id: 2,
      imgSlide: 'https://blog.dktcdn.net/files/topping-pizza-1.png',
    },
    {
      id: 3,
      imgSlide:
        'https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg',
    },
  ];
  const getTypeDish = async (index: any) => {
    try {
      // setLoading(true);
      if (index == 1) {
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
      // setLoading(false);
    }
  };

  const getImageSlide = async () => {
    try {
      // setLoading(true); // Set loading to true before making the API call

      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/slide`,
        'get',
      );
      if (res.success === true) {
        setImageSlide(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const getTopDish = async () => {
    try {
      // setLoading(true); // Set loading to true before making the API call
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/thongke/mon-ban-chay`,
        'get',
      );
      if (res.success === true) {
        setDishTop(res.list);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const handlePress = (item: any) => {
    navigation.navigate('DetailMonScreen', {idMon: item?.idMon});
  };

  const onScrollBeginDrag = () => {
    setAutoplay(false); // Tắt autoplay
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    // if (isFocused) {
      getTopDish();
      getTypeDish(1);
      getTypeDish(2);
      getImageSlide();
    // }
  }, []);

  return (
    <ScrollView>
        <SearchHeader
            setSearchValue={setSearch}
            searchValue={search}
            searchAction={() => openScreen('SearchMonScreen')}
            navigation={navigation}
        />
      <View>
        <Swiper
          ref={swiperRef}
          style={styles.wrapper}
          autoplay={autoplay} // Sử dụng state để điều khiển autoplay
          autoplayTimeout={4}
          onScrollBeginDrag={onScrollBeginDrag} // Tạm thời tắt tự động chuyển slide khi người dùng thao tác
        >
          {imageSlide.length > 0 ? 
              imageSlide.map((item: any, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePress(item)}>
                  <View style={styles.slide}>
                    <Image
                      source={{
                        uri: item.imgSlide,
                      }}
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              ))
            : 
              data.map((item: any, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePress(item)}>
                  <View style={styles.slide}>
                    <Image
                      source={{
                        uri: item.imgSlide,
                      }}
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              ))}
        </Swiper>
      </View>
      <View>
        {dishTop && dishTop.length > 0 && ( // Kiểm tra nếu dishTop tồn tại và có phần tử
            <View style={{backgroundColor: appColors.white, flex: 1}}>
              <FlatListHomeComponent
                data={dishTop}
                showIndicator={false}
                textTitle="Món bán chạy"
                textSeeMore="Xem thêm"
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
                  navigation.navigate('SearchMonScreen');
                }}
              />
            </View>
          )}

        {typeDish1 && typeDish1.length > 0 && (
          <View style={{backgroundColor: appColors.white,  flex: 1}}>
            <FlatListHomeComponent
              data={typeDish1}
              showIndicator={false}
              textTitle={nameTypeDish1}
              textTag="Giải khát"
              textSeeMore="Xem thêm"
              styleTitle={{
                color: appColors.coolPurple,
              }}
              onItemClick={(item: Mon) => {
                navigation.navigate('DetailMonScreen', {idMon: item?._id});
              }}
              onSeeMoreClick={() => {
                navigation.navigate('SearchMonScreen');
              }}
              styleTag={{
                color: appColors.coolPurple,
                borderColor: appColors.coolPurple,
              }}
            />
          </View>
        )}

        {typeDish2 && typeDish2.length > 0 && (
          <View style={{backgroundColor: appColors.white,  flex: 1}}>
            <FlatListHomeComponent
              data={typeDish2}
              showIndicator={false}
              textTitle={nameTypeDish2}
              textTag="Giải khát"
              textSeeMore="Xem thêm"
              styleTitle={{
                color: appColors.coolPurple,
              }}
              onItemClick={(item: Mon) => {
                navigation.navigate('DetailMonScreen', {idMon: item?._id});
              }}
              onSeeMoreClick={() => {
                navigation.navigate('SearchMonScreen');
              }}
              styleTag={{
                color: appColors.coolPurple,
                borderColor: appColors.coolPurple,
              }}
            />
          </View>
        )}
      </View>
      {/* <LoadingComponent visible={loading} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: appColors.white,
  // },
  header: {
    justifyContent: 'space-between',
  },
  viewSearch: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },

  wrapper: {
    height: 200
  },
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
