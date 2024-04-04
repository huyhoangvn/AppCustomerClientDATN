import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getData } from '../../utils/storageUtils';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appColors } from '../../constants/appColors';
import NavProps from '../../models/props/NavProps';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import QuantitySelector from '../../component/giohang/QuantitySelector';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDisease, faTimes } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { showAlert } from '../../utils/showAlert';
import TextViewComponent from '../../component/text/TextViewComponent';

const InfoKHResExample = {
  success: true,
  index: {
    idKH: "1",
    sdt: "0933765999",
    diaChi: "Đơn nguyên 1,2 - KTX Mỹ Đình, Hàm Nghi, Mỹ Đình 2, Nam Từ Liêm, HN",
  },
  msg: ""
}

const xoaGioHangResExample = {
  success: true,
  index: {
    idMon: "2"
  },
  msg: "Xóa thành công"
}

const AddHoaDonScreen: React.FC<NavProps> = ({ navigation } : any) => {
  const route : any = useRoute();
  // Truy cập các tham số từ đối tượng route
  const { saveList, idKH } = route.params;
  // let danhSachSoLuong: number[] = new Array(saveList.length).fill(1);
  const [idKhachHang, setIdKhachHang] = useState("");
  const [idCH, setIdCH] = useState("");
  const [tenCH, setTenCH] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [sdt, setSdt] = useState("");
  const [danhSachDatMon, setDanhSachDatMon] = useState<any[]>([]);
  const [soLuongMonDat, setSoLuongMonDat] = useState(0)
  const [tongTien, setTongTien] = useState(0)
  const [thanhTien, setThanhTien] = useState(0)
  const [khuyenMai, setKhuyenMai] = useState(30)
  const [tenkhuyenMai, setTenKhuyenMai] = useState(0)
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState([])

  useEffect(()=>{
    setIdCH(saveList[0].idCH)
    setTenCH(saveList[0].tenCH)
    setDanhSachDatMon(saveList)
    setSoLuongMonDat(saveList.length)
    getInfoKhachHang(idKH);
    setIdKhachHang(idKH);
  }, [])

  useEffect(()=>{
    hienThiTien()
  }, [danhSachDatMon])

  const getInfoKhachHang = (id: string) => {
    if(!id){return}

    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/khachhang' + "/" + id,
      //   'get',
      // );
      const res : any = InfoKHResExample
      if (res.success === true) {
        const { index } = res;
        setDiaChi(index.diaChi);
        setSdt(index.sdt)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleSaveItem = (soLuong : number, id: string) => {
    //Tăng giảm số lượng
    const selectedItem = danhSachDatMon.map(data => {
      if(data.idMon === id){
        return {
          ...data,
          soLuong: soLuong
        }
      } else {
        return data;
      }
    })
    setDanhSachDatMon(selectedItem)
  };

  const removeFromList = (id: string, ten: string) => {
    showAlert("Bạn có muốn xóa ?", "Xóa món " + ten + " khỏi giỏ hàng của bạn.", true)
    .then(result => {
      if (result) {
        try{
        //Gọi api xóa
        // const res : any = await authenticationAPI.HandleAuthentication(
        //   '/khachhang/gioHang' + "/" + id,
        //   {idMon: id}
        //   'delete',
        // );
          const res : any = xoaGioHangResExample
          if(res.success === true){
            const updatedDanhSachDatMon = danhSachDatMon.filter(item => item.idMon !== id);    
            setDanhSachDatMon(updatedDanhSachDatMon);
            setSoLuongMonDat(soLuongMonDat-1)
            if(updatedDanhSachDatMon.length === 0){
              navigation.goBack()
            }
          }
          showAlert("Xóa món", res.msg, false)
        }
        catch(e){
          showAlert("Xóa món", "Xóa món thất bạn", false)
        }
      }
    })
    .catch(e => {
      // Handle error if necessary
      showAlert("Xóa món", "Xóa món thất bạn", false)
    });
  }

  const hienThiTien = () => {
    const tongTien = tinhTongTien(danhSachDatMon)
    setTongTien(tongTien)
    const thanhTien = tongTien - Math.ceil(tongTien*khuyenMai/100)
    setThanhTien(thanhTien)
  }

  const tinhTongTien = (danhSachMon: any[]): number => {
    let tongTien = 0;
    for(let i = 0; i < danhSachMon.length; i++){
        tongTien += danhSachMon[i].giaTien * danhSachMon[i].soLuong;
    }
    return tongTien;
  }


  const GioHangItem = ({ item , onSaveItem }: { item: any, onSaveItem: Function }) => {

    //openSearchScreen(item.idMon)
    const openSearchScreen = (idMon: string) => {
      navigation.navigate('DetailMonScreen', {
        idMon: idMon,
        showMoreContent: true,
        uniqueId: Math.random() 
      });
    };

    const handleQuantityChange = (soLuong: number, id: string) => {
      onSaveItem(soLuong, id)
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={()=> openSearchScreen(item.idMon)} activeOpacity={0.7}>
        <Image style={styles.itemImage}
          source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')} 
        />
        <View style={styles.itemDetails}>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.itemName}>{item.tenMon}</Text>
            <TouchableOpacity onPress={()=>removeFromList(item.idMon, item.tenMon)}>
              <FontAwesomeIcon icon={faTimes} size={appIcon.normal}></FontAwesomeIcon>
            </TouchableOpacity>
          </View>
          <Text style={styles.normal}>{formatCurrency(item.giaTien)}</Text>
          <View style={{width: 150, marginVertical: 5}}>
            <QuantitySelector initialValue={item.soLuong} onChange={(soLuong: number)=>handleQuantityChange(soLuong, item.idMon)} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contain}>
      <ScrollView>
          <Text>Số lượng đặt món (<Text>{soLuongMonDat}</Text>)</Text>
          <FlatList
            scrollEnabled={false}
            data={danhSachDatMon}
            renderItem={({ item }: any) => <GioHangItem item={item} onSaveItem={handleSaveItem}/>}
            keyExtractor={(item : any) => item.idGH}
            />
          <TextViewComponent
            leftText="Địa chỉ giao"
            rightText={diaChi}
          />
          <TextViewComponent
            leftText="Số điện thoại"
            rightText={sdt}
          />
          <TextViewComponent
            leftText="Tổng tiền"
            rightText={formatCurrency(tongTien)}
          />
          <TextViewComponent
            leftText="Thành tiền"
            rightText={formatCurrency(thanhTien)}
            leftBold={true}
            backgroundColor={appColors.secondary}
            showBorderBottom={false}
          />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
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
  itemImage: {
    width: appImageSize.size75.width,
    height: appImageSize.size75.height,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column', // Change flex direction to column
  },
  itemName: {
    fontSize: appFontSize.normal,
    fontWeight: 'bold',
    color: appColors.text
  },
  normal: {
    fontSize: appFontSize.normal,
    color: appColors.text,
  }
})

export default AddHoaDonScreen;
