import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import Header from './../../component/detail/Header';
import { appColors } from '../../constants/appColors';
import authenticationAPI from '../../apis/authApi';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appFontSize } from '../../constants/appFontSizes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faStar, faStore  } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import StarDanhGia from '../../component/detail/StarDanhGia';
import { appImageSize } from '../../constants/appImageSize';
import { Delivery } from '../../assest/svgs';
import MoreDetail from '../../component/detail/MoreDetail';
import DeliveryNote from '../../component/detail/DeliveryNote';

const chiTietMonResExample = {
  success: true,
  index: {
    idMon: "1",
    idCH: "1",
    idLM: "1",
    tenMon: "Trà sữa",
    tenLM: "Giải khát",
    tenCH: "Five Star",
    giaTien: 20000,
    hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg"
  },
  msg: ""
}

const TrungBinhDanhGiaResExample = {
  success: true,
  index: 4.5,
  msg: "Đã thành công"
}

const DanhSachDanhGiaResExample = {
  success: true,
  list: [
    {
      idDG: "1",
      tenKH: "Nguyễn Huy Hoàng",
      danhGia: 5,
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg",
      thoiGianTao: "23:45 31-12-2021",
    },
    {
      idDG: "2",
      tenKH: "Nguyễn Xuân Phúc",
      danhGia: 3,
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg",
      thoiGianTao: "22:45 31-12-2021",
    }
  ],
  count: 2,
  totalPages: 1,
  currentPage: 1,
  msg: ""
}

const DanhSachDanhGiaResExampleLoadingMore = {
  success: true,
  list: [
    {
      idDG: "3",
      tenKH: "Lò Văn Quyết",
      danhGia: 5,
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg",
      thoiGianTao: "23:45 31-12-2021",
    },
    {
      idDG: "4",
      tenKH: "Đinh Văn Ngọc Vũ",
      danhGia: 3,
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg",
      thoiGianTao: "22:45 31-12-2021",
    }
  ],
  count: 2,
  totalPages: 1,
  currentPage: 1,
  msg: ""
}

const DetailMonScreen = ({ navigation} : any) =>  {
  const route: any = useRoute();

  const [idMon, setIdMon] = useState("");
  const [idCH, setIdCH] = useState("");
  const [idLM, setIdLM] = useState("");
  const [tenLM, setTenLM] = useState("Tên Loại Món");
  const [tenMon, setTenMon] = useState("Tên Món");
  const [tenCH, setTenCH] = useState("Tên Cửa Hàng");
  const [giaTien, setGiaTien] = useState(20000);
  const [trungBinhDanhGia, setTrungBinhDanhGia] = useState(0);
  const [thoiGianGiaoHang, setThoiGianGiaoHang] = useState(30);//30 phút
  const [soLuongDanhGia, setSoLuongDanhGia] = useState(0);
  const [danhSachDanhGia, setDanhSachDanhGia] = useState<any[]>([]);
  const [hinhAnh, setHinhAnh] = useState(require('./../../assest/image/default-image.jpg')); // Default image path
  const [rating, setRating] = useState(1); //Đánh giá chọn
  const [trang, setTrang] = useState(1);
  const [msg, setMsg] = useState("");
  const [showMoreContent, setShowMoreContent] = useState(true);

  useEffect(() => {
    const id = route.params?.idMon || "";
    setShowMoreContent(route.params?.showMoreContent);
    layChiTietMon(id);
    layTrungBinhDanhGiaMon(id);
    layDanhSachDanhGia(id);
    setIdMon(id);
  }, []);

  const handleSaveReview = async () => {
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/danhgia',
      //    {danhGia: rating}
      //   'post',
      // );
      const res : any = TrungBinhDanhGiaResExample;

      if (res.success === true) {
        const { msg } = res;
        Alert.alert(
          'Success',
          msg,
          [
            {
              text: 'OK',
              onPress: async () => {
                console.log('Đã lưu đánh giá thành công')
              },
              style: 'default'
            }
          ],
          { cancelable: false }
        );
        await layDanhSachDanhGia(idMon);
      }
    } catch (e) {
      console.log(e);
    } 
  };

  //Lấy chi tiết món
  const layChiTietMon = async (id: string) => {
    if(!id){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/mon' + "/" + id,
      //   'get',
      // );
      const res : any = chiTietMonResExample;

      if (res.success === true) {
        const { index } = res;
        setIdMon(index.idMon);
        setIdCH(index.idCH);
        setIdLM(index.idLM);
        setTenMon(index.tenMon);
        setTenLM(index.tenLM);
        setTenCH(index.tenCH);
        setHinhAnh(index.hinhAnh); // Update image path
      }
    } catch (e) {
      console.log(e);
    }  
  }

  //Lấy trung bình số sao đánh giá của món
  const layTrungBinhDanhGiaMon = async (id: string) => {
    if(!id){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/mon' + "/" + id,
      //   'get',
      // );
      const res : any = TrungBinhDanhGiaResExample

      if (res.success === true) {
        setTrungBinhDanhGia(res.index);
      }
    } catch (e) {
      console.log(e);
    }
  }

  //Lấy danh sách đánh giá của món
  const layDanhSachDanhGia = async (id: string) => {
    if(!id){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/danhGia' + "/" + id,
      //   'get',
      // );
      const res : any = DanhSachDanhGiaResExample

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongDanhGia(count);
        setDanhSachDanhGia(list);
        setTrang(1);
      }
    } catch (e) {
      console.log(e);
    } 
  }

  const xemThem = async () => {
    if(!idMon){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/danhGia' + "/" + id + "?trang=" + (trang+1),
      //   'get',
      // );
      const res : any = DanhSachDanhGiaResExampleLoadingMore

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongDanhGia(count);
        setDanhSachDanhGia(prevList => [...prevList, ...list]);
        setTrang(trang+1);
      }
    } catch (e) {
      console.log(e);
    } 
  }

  // Di chuyển qua màn hình chi tiết cửa hàng
  const openDetailCuaHangScreen = (id: string) => {
    if(!id){return;}
    navigation.navigate('DetailCuaHangScreen', {
      idCH: id,
    });
  };

  //Item đánh giá của món trong flatlist
  const ItemDanhGia = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')}
            style={styles.userAvatar}
          />
          <View>
            <Text style={styles.userName}>{item.tenKH}</Text>
            <Text style={styles.time}>{item.thoiGianTao}</Text>
            <StarDanhGia trungBinhDanhGia={item.danhGia}/>
          </View>
        </View>
      </View>
    );
  };

  // Render
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header backgroundImageUrl={hinhAnh} color={appColors.white}/>

        <View style={styles.main}>
          
          <Text style={styles.title}>{tenMon}</Text>
          <StarDanhGia trungBinhDanhGia={trungBinhDanhGia}/>
          <Text style={styles.normal}>{tenLM}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.normal}>{giaTien}</Text>
            <Text style={[styles.normal, { textDecorationLine: 'underline', paddingLeft: 5 }]}>đ</Text>
          </View>

          {showMoreContent && (
            <MoreDetail 
              title={tenCH} 
              moreText="Xem cửa hàng"
              onPress={() => openDetailCuaHangScreen(idCH)} 
              icon={faStore} // Icon tùy chọn
              iconColor={appColors.coolPurple}
              titleColor={appColors.coolPurple}
              moreTextColor ={appColors.coolPurple}
            />          
          )}

          <DeliveryNote 
            deliveryText="Giao hàng tiêu chuẩn"
            deliveryTime={thoiGianGiaoHang}
          />

          <View style={styles.chonDanhGia}>
            <Text style={styles.label}>Đánh giá của bạn!</Text>
            <View style={styles.row}>
              <FontAwesomeIcon icon={faStar} color={appColors.yellow} size={appIcon.normal}/>
              <Picker
                selectedValue={rating}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
                // mode="dropdown"
                >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
              </Picker>
            </View>
            <TouchableOpacity onPress={handleSaveReview} style={styles.button}>
                <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>Số đánh giá {soLuongDanhGia}</Text>
          </View>
          <FlatList
              scrollEnabled={false}
              data={danhSachDanhGia}
              renderItem={({ item }) => <ItemDanhGia item={item} />}
              keyExtractor={(item : any) => item.idDG}
          />
          <TouchableOpacity onPress={() => xemThem()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: appColors.primary, fontSize: appFontSize.normal}}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  main: {
    padding: 10
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: appColors.boderColor, // Remove border color
    borderRadius: 12,
    backgroundColor: appColors.white,
    margin: 3,
    elevation: 3
  },  
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: appImageSize.size50.width,
    height: appImageSize.size50.height,
    borderRadius: appImageSize.size50.width,
    marginRight: 10,
  },
  userName: {
    fontSize: appFontSize.normal,
    color: appColors.text,
    fontWeight: '500',
  },
  //Text
  title: {
    fontSize: appFontSize.title,
    color: appColors.text,
    fontWeight: 'bold'
  },
  normal: {
    fontSize: appFontSize.normal,
    color: appColors.text
  },
  time: {
    fontSize: appFontSize.small,
    color: appColors.textGray,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: appFontSize.normal,
    fontWeight: 'bold',
    color: appColors.warmOrange
  },
  picker: {
    flex: 1
  },
  button: {
    backgroundColor: appColors.primary, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: appColors.white, 
    fontWeight: 'bold',
    fontSize: appFontSize.normal,
  },
  chonDanhGia: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  }
});

export default DetailMonScreen;
