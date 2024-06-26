import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useRoute } from '@react-navigation/native';
import Header from './../../component/detail/Header';
import { appColors } from '../../constants/appColors';
import authenticationAPI from '../../apis/authApi';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appFontSize } from '../../constants/appFontSizes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faStar, faStore, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import StarDanhGia from '../../component/detail/StarDanhGia';
import { appImageSize } from '../../constants/appImageSize';
import { Delivery } from '../../assest/svgs';
import MoreDetail from '../../component/detail/MoreDetail';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { getData } from '../../utils/storageUtils';
import OptionPicker from '../../component/detail/OptionPicker';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import { showAlert } from '../../utils/showAlert';
import QuantityComponent from '../../component/text/QuantityComponent';

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
    hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png"
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
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
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

const KiemTraGioHangResExample = {
  success: true,
  index: true,
  msg: "Đã có trong giỏ hàng"
}

const DetailMonScreen = ({ navigation} : any) =>  {
  const route: any = useRoute();

  const [idMon, setIdMon] = useState("");
  const [idCH, setIdCH] = useState("");
  const [idLM, setIdLM] = useState("");
  const [tenLM, setTenLM] = useState("Tên Loại Món");
  const [tenMon, setTenMon] = useState("Tên Món");
  const [tenCH, setTenCH] = useState("Tên Cửa Hàng");
  const [giaTien, setGiaTien] = useState(0);
  const [trungBinhDanhGia, setTrungBinhDanhGia] = useState(0);
  const [thoiGianGiaoHang, setThoiGianGiaoHang] = useState(30);//30 phút
  const [soLuongDanhGia, setSoLuongDanhGia] = useState(0);
  const [danhSachDanhGia, setDanhSachDanhGia] = useState<any[]>([]);
  const [hinhAnh, setHinhAnh] = useState(require('./../../assest/image/default-image.jpg')); // Default image path
  const [rating, setRating] = useState(1); //Đánh giá chọn
  const [trang, setTrang] = useState(1);
  const [msg, setMsg] = useState("");
  const [showMoreContent, setShowMoreContent] = useState(true);
  const [idKH, setIdKH] = useState("");
  const isFocused = useIsFocused();
  const [inCart, setInCart] = useState(false);
  const [cartColor, setCartColor] = useState(appColors.gray);
  const [textThem, setTextThem] = useState("Xem thêm")

  useEffect(() => {
    const id = route.params?.idMon || "";
    setShowMoreContent(route.params && route.params.showMoreContent !== undefined ? route.params.showMoreContent : true);
    layChiTietMon(id);
    layTrungBinhDanhGiaMon(id);
    layDanhSachDanhGia(id);
    setIdMon(id);
  }, []);

  useEffect(() => {
    if(isFocused){
      layIsInGioHang();
    }
  }, [isFocused])

  //Để lấy xem món đã trong giỏ hàng chưa
  const layIsInGioHang = async ()=> {
    const idMon = route.params?.idMon || "";
    const idKH = await getIdKH()
    await isInGioHang(idKH, idMon)
    setIdKH(idKH)
  }

  const isInGioHang = async(idKH :string, idMon: string)=>{
    try {

      //Lấy idKH
      if(!idKH || !idMon){return false;}
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/giohang/isMonExist' + '/' + idKH,
         {idMon: idMon},
        'post',
      );
      // const res : any = KiemTraGioHangResExample;
      
      if (res.success === true) {
        const { index } = res;
        setInCart(res.index)
        setCartColor(appColors.primary)
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  const getIdKH = async ()=>{
    const storedData = await getData();
    return storedData?.idKH || "";
  }

  const handleCartClick = async () => {
    if(!idKH || !idMon){return;}
    if (inCart) {
      showAlert("Món đã trong giỏ hàng", "Bạn có muốn đến giỏ hàng ?", true)
      .then((result)=>{
          if(result){
            navigation.navigate('GioHangScreen');
          }
      })
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/giohang/delete' + "/" + idKH,
      //   {  idMon: idMon },
      //   'delete',
      // );

      // // const res = {success: true}
      // if(res.success === true){
      //   showAlert('Xóa khỏi giỏ hàng', "Món " + tenMon);
      //   setCartColor(appColors.gray);
      //   setInCart(false);
      // }
    } else {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/gioHang/them' + "/" + idKH,
        { idMon: idMon },
        'post',
      );
      // const res = {success: true}
      if(res.success === true){
        setCartColor(appColors.primary);
        setInCart(true);
        //Gọi api thêm giỏ hàng
        showAlert('Thêm vào giỏ hàng', "Món " + tenMon);
      }
    }
  };

  const handleSaveReview = async (id: string) => {
    try {

      //Lấy idKH
      if(!id){return;}
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/danhgia/them' + "/" + idKH + "/" + idMon,
         {danhGia: rating},
        'post',
      );
      // const res : any = TrungBinhDanhGiaResExample;
      if (res.success === true) {
        const { msg } = res;
        showAlert("Lưu đánh giá", "Đánh giá của bạn là " + rating + " sao");
        await layDanhSachDanhGia(idMon);
      } else {
        showAlert("Lưu đánh giá", res.msg);
      }
    } catch (e) {
      console.log(e);
    } 
  };

  //Lấy chi tiết món
  const layChiTietMon = async (id: string) => {
    if(!id){return;}
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/mon' + "/" + id,
        'get',
      );
      // const res : any = chiTietMonResExample;

      if (res.success === true) {
        const { index } = res;
        setIdMon(index.idMon);
        setIdCH(index.idCH);
        setIdLM(index.idLM);
        setTenMon(index.tenMon);
        setGiaTien(index.giaTien);
        setTenLM(index.tenLM);
        setTenCH(index.tenCH);
        setHinhAnh(index.hinhAnh); // Update image path
        setTrungBinhDanhGia(index.trungBinhDanhGia);
      
      }
    } catch (e) {
      console.log(e);
    }  
  }

  //Lấy trung bình số sao đánh giá của món
  const layTrungBinhDanhGiaMon = async (id: string) => {
    if(!id){return;}
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/danhgia/get-trung-binh' + "/" + id,
        'get',
      );
      // const res : any = TrungBinhDanhGiaResExample

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
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/danhgia/get-danh-sach-theo-mon-filter' + "/" + id + "?trangThai=true",
        'get',
      );
      // const res : any = DanhSachDanhGiaResExample
      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongDanhGia(count);
        setDanhSachDanhGia(list);
        setTrang(1);
        setTextThem("Xem Thêm")
      }
    } catch (e) {
      console.log(e);
    } 
  }

  const xemThem = async () => {
    if(!idMon){return;}
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/danhgia/get-danh-sach-theo-mon-filter' + "/" + idMon + "?trang=" + (trang+1),
        'get',
      );
      // const res : any = DanhSachDanhGiaResExampleLoadingMore

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setSoLuongDanhGia(soLuongDanhGia + list.length);
        setDanhSachDanhGia(prevList => [...prevList, ...list]);
        setTrang(trang+1);
        if(list.length === 0){
          setTextThem("Hết")
        }
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
            source={(item.hinhAnh && item.hinhAnh !== "") ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')}
            style={styles.userAvatar}
            defaultSource={require('./../../assest/image/default-image.jpg')}
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
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.title}>{tenMon}</Text>
            <TouchableOpacity onPress={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} color={cartColor} size={appIcon.big} />
            </TouchableOpacity>
          </View>
          <StarDanhGia trungBinhDanhGia={trungBinhDanhGia}/>
          <Text style={styles.normal}>{tenLM}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.normal}>{formatCurrency(giaTien)}</Text>
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
            title="Giao hàng tiêu chuẩn"
            mainText={thoiGianGiaoHang}
            textBefore="Dự kiến giao trong khoảng "
            textAfter=" phút từ khi đặt hàng"
            icon={<Delivery />}
          />

          <OptionPicker
                option={rating}
                onOptionChange={setRating}
                options={[1, 2, 3, 4, 5]}
                handleSave={()=>{handleSaveReview(idKH)}}
                optionTitle="Đánh giá của bạn!" // Optional title
                icon={faStar}
          />

          <QuantityComponent
            label="Số đánh giá"
            soLuong={soLuongDanhGia}/>
          <FlatList
              scrollEnabled={false}
              data={danhSachDanhGia}
              renderItem={({ item }) => <ItemDanhGia item={item} />}
              keyExtractor={(item : any) => item.idDG}
          />
          <TouchableOpacity onPress={() => xemThem()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: appColors.primary, fontSize: appFontSize.normal}}>{textThem}</Text>
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
