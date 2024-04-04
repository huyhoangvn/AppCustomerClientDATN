import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './../../component/detail/Header'; // Import the Header component
import { appColors } from '../../constants/appColors';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import { ScrollView } from 'react-native-gesture-handler';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { appIcon } from '../../constants/appIcon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Delivery } from '../../assest/svgs';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import { showAlert } from '../../utils/showAlert';

const chiTietCuaHangResExample = {
  success: true,
  index: {
    idCH: "1",
    sdt: "0933765999",
    diaChi: "Nam Từ Liêm",
    thoiGianMo: "00:00",
    thoiGianDong: "23:59",
    tenCH: "Five Star",
    hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png"
  },
  msg: ""
}

const DanhSachMonResExample = {
  success: true,
  list: [
    {
      idMon: "1",
      idLM: "1",
      tenLM: "Tráng miệng",
      tenMon: "Bánh Flan giòn tan",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      giaTien: 20000,
    },
    {
      idMon: "2",
      idLM: "2",
      tenLM: "Bánh ngọt",
      tenMon: "Bánh Quế giòn tan",
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg",
      giaTien: 45000,
    }
  ],
  count: 4,
  totalPages: 1,
  currentPage: 1,
  msg: ""
}

const DanhSachMonResExampleLoadingMore = {
  success: true,
  list: [
    {
      idMon: "3",
      idLM: "1",
      tenLM: "Tráng miệng",
      tenMon: "Bánh Donut",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      giaTien: 20000,
    },
    {
      idMon: "4",
      idLM: "2",
      tenLM: "Bánh ngọt",
      tenMon: "Bánh Kem",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      giaTien: 78000,
    }
  ],
  count: 4,
  totalPages: 1,
  currentPage: 1,
  msg: ""
}

const DetailMonScreen = ({ navigation } : any) =>  {
  const route: any = useRoute();

  const [idCH, setIdCH] = useState("");
  const [tenCH, setTenCH] = useState("Tên Cửa Hàng");
  const [diaChi, setdiaChi] = useState("Địa chỉ");
  const [thoiGianMo, setThoiGianMo] = useState("00:00");
  const [thoiGianDong, setThoiGianDong] = useState("00:00");
  const [sdt, setSdt] = useState("00:00");
  const [hinhAnh, setHinhAnh] = useState(require('./../../assest/image/default-image.jpg')); // Default image path

  const [thoiGianGiaoHang, setThoiGianGiaoHang] = useState(30);//30 phút

  const [soLuongMon, setSoLuongMon] = useState(0);
  const [danhSachMon, setDanhSachMon] = useState<any[]>([]);
  const [trang, setTrang] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const id = route.params?.idCH || "";// Lấy thông tin tìm kiếm từ bên trang chủ
    layChiTietCuaHang(id);
    layDanhSachMon(id);
    setIdCH(id);
  }, []);

  //Lấy chi tiết cửa hàng
  const layChiTietCuaHang = async (id: string) => {
    if(!id){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/cuahang' + "/" + id,
      //   'get',
      // );
      const res : any = chiTietCuaHangResExample;

      if (res.success === true) {
        const { index } = res;
        setIdCH(index.idCH);
        setTenCH(index.tenCH);
        setHinhAnh(index.hinhAnh); // Update image path
        setdiaChi(index.diaChi)
        setThoiGianMo(index.thoiGianMo)
        setThoiGianDong(index.thoiGianDong)
        setSdt(index.sdt)
      }
    } catch (e) {
      console.log(e);
    }  
  }

  //Lấy danh sách món của cửa hàng
  const layDanhSachMon = async (id: string) => {
    if(!id){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/cuahang' + "/danhsach/mon/" + id,
      //   'get',
      // );
      const res : any = DanhSachMonResExample

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongMon(count);
        setDanhSachMon(list);
        setTrang(1);
      }
    } catch (e) {
      console.log(e);
    } 
  }

  const xemThem = async () => {
    if(!idCH){return;}
    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/cuahang' + "/danhsach/mon/" + id + "?trang=" + (trang+1),
      //   'get',
      // );
      const res : any = DanhSachMonResExampleLoadingMore

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongMon(count);
        setDanhSachMon(prevList => [...prevList, ...list]);
        setTrang(trang+1);
      }
    } catch (e) {
      console.log(e);
    } 
  }

  // Di chuyển qua màn hình chi tiết cửa hàng
  const openDetailMonScreen = (id: string) => {
    if(!id){return;}
    navigation.navigate('DetailMonScreenFromCuaHang', {
      idMon: id,
      showMoreContent: false, 
      uniqueId: Math.random() 
    });
  };

  //Item đánh giá của món trong flatlist
  const ItemMon = ({ item }: { item: any }) => {
    const [inCart, setInCart] = useState(false);
    const [cartColor, setCartColor] = useState(appColors.gray);

    //Để hiện thêm vào giỏ hàng nhưng ko còn dùng nữa
    const handleCartClick = () => {
      if (inCart) {
        setCartColor(appColors.gray);
        setInCart(false);
        //Chạy api xóa
        showAlert('Xóa khỏi giỏ hàng', "Món " + item.tenMon);
      } else {
        setCartColor(appColors.primary);
        setInCart(true);
        //Chạy api thêm
        showAlert('Thêm vào giỏ hàng', "Món " + item.tenMon);
      }
    };

    return (
      <TouchableOpacity onPress={()=>openDetailMonScreen(item.idMon)} style={styles.itemContainer}>
          <View style={styles.monInfoContainer}>
            <Image
              source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')}
              style={styles.monImg}
            />
            <View style={{flex: 1}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                  <Text style={styles.tenMon}>{item.tenMon}</Text>
                  {/* <TouchableOpacity onPress={handleCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} color={cartColor} size={appIcon.normal} />
                  </TouchableOpacity>   */}
              </View>
              <Text style={styles.normal}>{formatCurrency(item.giaTien)}</Text>
            </View>
          </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header backgroundImageUrl={hinhAnh} color={appColors.white}/>
        <View style={styles.main}>
            <Text style={styles.title}>{tenCH}</Text>
            <Text style={styles.normal}>Địa chỉ: {diaChi}</Text>
            <Text style={styles.normal}>Số điện thoại: {sdt}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.normal}>Thời gian mở: </Text>
              <Text style={[styles.normal, { paddingRight: 5 }]}>{thoiGianMo}</Text>
              <Text>-</Text>
              <Text style={[styles.normal, { paddingLeft: 5 }]}>{thoiGianDong}</Text>
            </View>

            <DeliveryNote 
              title="Giao hàng tiêu chuẩn"
              mainText={thoiGianGiaoHang}
              textBefore="Dự kiến giao trong khoảng "
              textAfter=" phút từ khi đặt hàng"
              icon={<Delivery />}
              iconColor={appColors.primary}
            />

            <View>
              <Text>Số món của cửa hàng {soLuongMon}</Text>
            </View>
            <FlatList
                scrollEnabled={false}
                data={danhSachMon}
                renderItem={({ item }) => <ItemMon item={item} />}
                keyExtractor={(item : any) => item.idMon}
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
    flex: 1,
    padding: 10
  },
  itemContainer: {
    flex: 1,
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
  monInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monImg: {
    width: appImageSize.size50.width,
    height: appImageSize.size50.height,
    borderRadius: 8,
    marginRight: 10,
  },
  tenMon: {
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
  }
});

export default DetailMonScreen;
