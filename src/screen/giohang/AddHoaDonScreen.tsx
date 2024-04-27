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
import { faAddressBook, faDisease, faLocation, faLocationDot, faMapMarker, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { showAlert } from '../../utils/showAlert';
import TextViewComponent from '../../component/text/TextViewComponent';
import OptionPicker from '../../component/detail/OptionPicker';
import KhuyenMaiPicker from '../../component/detail/KhuyenMaiPicker';
import EditTextComponent from '../../component/EditTextComponent';
import QuantityComponent from '../../component/text/QuantityComponent';
import EditText from '../../component/edittext/EditText';
import Button from '../../component/button/MyButtonComponent';
import MyButtonComponent from '../../component/button/MyButtonComponent';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote } from '../../assest/svgs';
import authenticationAPI from '../../apis/authApi';

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

const DanhSachKhuyenMaiResExample = {
  success: true,
  list: [
    {
      idKMCuaToi: "1",
      idKH: "1",
      idKM: "2",
      tieuDe: "Giảm giá 30% đơn 100k",
      phanTramKhuyenMai: 30,
      donToiThieu: 1000000
    },
    {
      idKMCuaToi: "1",
      idKH: "1",
      idKM: "3",
      tieuDe: "Giảm giá 10% Đơn 0 đồng",
      phanTramKhuyenMai: 10,
      donToiThieu: 0
    },
  ],
  count: 3,
  msg: ""
}

const themHoaDonRes = {
  success: true,
  index: "1",
  msg: "Xóa thành công"
}

const AddHoaDonScreen: React.FC<NavProps> = ({ navigation } : any) => {
  const route : any = useRoute();
  // Truy cập các tham số từ đối tượng route
  const { saveList, idKH } = route.params;
  // let danhSachSoLuong: number[] = new Array(saveList.length).fill(1);
  const [idCH, setIdCH] = useState("");
  const [tenCH, setTenCH] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [sdt, setSdt] = useState("");
  const [danhSachDatMon, setDanhSachDatMon] = useState<any[]>([]);
  const [soLuongMonDat, setSoLuongMonDat] = useState(0)
  const [tongTien, setTongTien] = useState(0)
  const [thanhTien, setThanhTien] = useState(0)
  const [khuyenMai, setKhuyenMai] = useState(30)
  const [idKM, setIdKM] = useState("")
  const [tenkhuyenMai, setTenKhuyenMai] = useState(0)
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState([{
    _id: "0",
    idKM: "000000000000000000000000",
    tieuDe: "Không khuyến mãi",
    phanTramKhuyenMai: 0,
    donToiThieu: 0
  }])
  const [phiGiaoHang, setPhiGiaoHang] = useState(24000)

  useEffect(()=>{
    setIdCH(saveList[0].idCH)
    setTenCH(saveList[0].tenCH)
    setDanhSachDatMon(saveList)
    setSoLuongMonDat(saveList.length)
    getInfoKhachHang(idKH);
    getDanhSachKhuyenMaiCuaToi(idKH)
  }, [])

  useEffect(()=>{
    hienThiTien()
  }, [danhSachDatMon, khuyenMai])

  const getDanhSachKhuyenMaiCuaToi = async (id: string)=>{
    if(!id){return}

    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/khuyenmaicuatoi/danh-sach' + "/" + id,
        'get',
      );
      // const res : any = DanhSachKhuyenMaiResExample
      const khongKhuyenMai = {
        _id: "0",
        idKM: "000000000000000000000000",
        tieuDe: "Không khuyến mãi",
        phanTramKhuyenMai: 0,
        donToiThieu: 0
      };
      if (res.success === true) {
        const { list } = res;
        const updatedList : any = [khongKhuyenMai, ...list];
        setDanhSachKhuyenMai(updatedList);
        setKhuyenMai(khongKhuyenMai.phanTramKhuyenMai)
        setIdKM(khongKhuyenMai.idKM)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getInfoKhachHang = async (id: string) => {
    if(!id){return}

    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang' + "/thong-tin/" + id,
        'get',
      );
      // const res : any = InfoKHResExample
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
    showAlert("Bạn có muốn xóa ?", "Xóa món " + ten + " khỏi chọn món của bạn.", true)
    .then(result => {
      if (result) {
        try{
          //Gọi api xóa khỏi giỏ hàng
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
              return
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
    const tongTienTemp = tinhTongTien(danhSachDatMon)
    setTongTien(tongTienTemp)
    const thanhTien = tongTienTemp - Math.ceil(tongTien*khuyenMai/100) + phiGiaoHang
    setThanhTien(thanhTien)
  }

  const tinhTongTien = (danhSachMon: any[]): number => {
    let tongTien = 0;
    for(let i = 0; i < danhSachMon.length; i++){
        tongTien += danhSachMon[i].giaTien * danhSachMon[i].soLuong;
    }
    return tongTien;
  }

  const handleAddressChange = (text: string) => {
    setDiaChi(text);
  };

  const handlePhoneChange = (text: string) => {
    setSdt(text);
  };

  // Function to handle option change
  const handleOptionChange = (option: any) => {
    if(option.donToiThieu <= tongTien){
      setIdKM(option.idKM)
      setKhuyenMai(option.phanTramKhuyenMai)
    } else {
      showAlert("Không thỏa mãn đơn tối thiểu ", "Đơn tối thiểu để dùng khuyến mãi là " + formatCurrency(option.donToiThieu), false)
    }
  };

  const handleTextDiaChiChange = (diaChi: string) => {
    setDiaChi(diaChi)
  }

  const muaHang = async () => {
    try {
      const dataBody = {
        idKH: idKH,
        idCH: idCH,
        idKM: idKM,
        diaChiGiaoHang: diaChi,
        list: danhSachDatMon.map(item => ({
          idMon: item.idMon,
          soLuong: item.soLuong
        }))
      }
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/datmon/them',
        dataBody,
        'post',
      );
      // const res = themHoaDonRes
      if (res.success === true) {
        const { index } = res;
        await showAlert("Thêm hóa đơn thành công", "Hiển thị chi tiết hóa đơn đã tạo", true)
        .then(result => {
          if (result) {
            navigation.navigate('DetailHoaDonScreen', {
              idHD: res.index,
            });
          }
        })
      } else {
        showAlert("Thêm hóa đơn thất bại", res.msg)
      }
    } catch (e) {
      showAlert("Thêm hóa đơn thất bại", "Lỗi hệ thống")
    }
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
    <ScrollView>
    <View style={styles.contain}>
          <QuantityComponent
              label="Số lượng đặt món"
              soLuong={soLuongMonDat}/>          
          <FlatList
            scrollEnabled={false}
            data={danhSachDatMon}
            renderItem={({ item }: any) => <GioHangItem item={item} onSaveItem={handleSaveItem}/>}
            keyExtractor={(item : any) => item._id}
            />
          <TextViewComponent
            leftText="Tổng tiền"
            rightText={formatCurrency(tongTien)}
          />
          <EditText
            label="Địa chỉ giao hàng"
            placeholder="Nhập địa chỉ giao hàng"
            value={diaChi}
            onChangeText={handleTextDiaChiChange}
            inputType="default"
            icon={faLocationDot}
            iconColor={appColors.gray}
            borderColor={appColors.boderColor}
          />
          <DeliveryNote
            title="Ấn vào nút bên dưới để đặt hàng"
            mainText="Phí vận chuyển 24.000 đ"
            icon={<BillCreateNote />}
            backgroundColor={appColors.lighterOrange}
          />
          <KhuyenMaiPicker
            option={idKM}
            onOptionChange={handleOptionChange}
            options={danhSachKhuyenMai}
            optionTitle="Khuyến mãi "
          />
          <TextViewComponent
            leftText="Thành tiền"
            rightText={formatCurrency(thanhTien)}
            leftBold={true}
            backgroundColor={appColors.secondary}
            showBorderBottom={false}
          />
          <MyButtonComponent text="Đặt hàng" onPress={muaHang} color={appColors.primary}/>
    </View>
    </ScrollView>
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
