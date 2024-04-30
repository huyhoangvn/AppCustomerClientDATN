import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appColors } from '../../constants/appColors';
import NavProps from '../../models/props/NavProps';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import { showAlert } from '../../utils/showAlert';
import TextViewComponent from '../../component/text/TextViewComponent';
import MyButtonComponent from '../../component/button/MyButtonComponent';
import authenticationAPI from '../../apis/authApi';
import { formatTrangThai, formatTrangThaiGiaoHang, formatTrangThaiThanhToan } from '../../utils/trangThaiFormat';
import { formatTrangThaiColor, formatTrangThaiGiaoHangColor, formatTrangThaiThanhToanColor } from '../../utils/trangThaiColor';
import { Linking } from 'react-native';
import OptionPicker from '../../component/detail/OptionPicker';
import ListOptionPicker from '../../component/drowpdown/ListOptionPicker';
import ImageVerificationOption from '../../component/detail/ImageVerificationOption';

const HoaDonResExample = {
  index: {
    idHD: "1",
    maHD: "ZI90K8",
    idKH: "2",
    tenKH: "Nguyễn Huy Hoàng",
    sdt: "0763421273",
    idKM: "1",
    tenKhuyenMai: "Giảm 30%",
    idCH: "1",
    tenCH: "FIVE STAR Cát Quế",
    phanTramKhuyenMaiDat: 30,
    diaChiGiaoHang: "Đơn nguyên 1,2 - KTX Mỹ Đình, Hàm Nghi, Mỹ Đình 2, Nam Từ Liêm, HN",
    thoiGianTao: "03-19-2024 11:30",
    thoiGianDuyet: "03-19-2024 11:30",
    thoiGianGiaoHangDuKien: "03-19-2024 11:30",
    ghiChu: "...",
    tongTien: 300000,
    thanhTien: 300000,
    trangThaiMua: 0,
    phiGiaoHang: 24000,
    trangThaiThanhToan: 0,
    trangThai: 0
  },
  list: [
    {
      idMD: "1",
      idMon: "1",
      tenMon: "Bánh tráng trộn FIVESTAR",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      giaTienDat: 20000,
      soLuong: 2
    },
    {
      idMD: "2",
      idMon: "2",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      tenMon: "Bánh tráng trộn ZEROSTAR",
      giaTienDat: 40000,
      soLuong: 1
    },
    {
      idMD: "3",
      idMon: "3",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      tenMon: "Bánh tráng trộn FOURSTAR",
      giaTienDat: 10000,
      soLuong: 7
    }
  ],
  count: 3,
  msg: "Thành công",
  success: true
}

const DeleteResExample = {
  success : true,
  msg: "Thành công",
}

const DetailHoaDonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const optionsLyDoThanhToan = [
    { key: 'Thanh toán tiền mặt', value: 0 },
    { key: 'Thanh toán chuyển khoản', value: 1},
  ];
  const route : any = useRoute();
  // Truy cập các tham số từ đối tượng route
  const idHD = route.params.idHD;
  // let danhSachSoLuong: number[] = new Array(saveList.length).fill(1);
  const [idKH, setIdKH] = useState("");
  const [maHD, setMaHD] = useState("")
  const [tenKH, setTenKH] = useState("");
  const [idCH, setIdCH] = useState("");
  const [tenCH, setTenCH] = useState("");
  const [thoiGianTao, setThoiGianTao] = useState("")
  const [thoiGianDuyet, setThoiGianDuyet] = useState("")
  const [thoiGianGiaoHangDuKien, setThoiGianGiaoHangDuKien] = useState("")
  const [diaChi, setDiaChi] = useState("");
  const [phanTramKhuyenMai, setPhanTramKhuyenMai] = useState(0);
  const [trangThaiMua, setTrangThaiMua] = useState(0)
  const [trangThai, setTrangThai] = useState(false)
  const [trangThaiThanhToan, setTrangThaiThanhToan] = useState(0)
  const [ghiChu, setGhiChu] = useState("")
  const [thanhTien, setThanhTien] = useState(0)
  const [danhSachMonDat, setDanhSachMonDat] = useState<any[]>([])
  const [isActiveThanhToan, setIsActiveThanhToan] = useState(false);
  const [isActiveHuy, setIsActiveHuy] = useState(false);
  const [phiVanChuyen, setPhiVanChuyen] = useState("")
  const [sdt, setSdt] = useState("")
  const [modalThanhToanVisible, setModalThanhToanVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(0)
  const [uri, setUri] = useState("")

  const getThongTinHD = async (id: string)=>{
    if(!id){return}

    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/khachhang/hoadon/detail' + "/" + id,
        'get',
      );
      // const res : any = HoaDonResExample
      if (res.success === true) {
        const { list, index } = res;
        setIdKH(index.idKH);
        setIdCH(index.idCH);
        setMaHD(index.maHD);
        setTenKH(index.tenKH);
        setTenCH(index.tenCH);
        setThoiGianTao(index.thoiGianTao)
        setThoiGianDuyet(index.thoiGianDuyet)
        setThoiGianGiaoHangDuKien(index.thoiGianGiaoHangDuKien)
        setDiaChi(index.diaChiGiaoHang)
        setSdt(index.sdt)
        setThanhTien(index.thanhTien)
        setPhanTramKhuyenMai(index.phanTramKhuyenMaiDat)
        setTrangThai(index.trangThai)
        setTrangThaiMua(index.trangThaiMua)
        setTrangThaiThanhToan(index.trangThaiThanhToan)
        setIsActiveThanhToan(index.trangThaiMua!==0 && index.trangThaiThanhToan!==1)
        setIsActiveHuy(((index.trangThaiMua === 0 && index.trangThai === true) || index.trangThai === false)?true:false)
        setPhiVanChuyen(formatCurrency(index.phiGiaoHang))
        setGhiChu(index.ghiChu)
        setPhuongThucThanhToan(index.phuongThucThanhToan)
        setUri(index.hinhAnhXacNhan)
        setDanhSachMonDat(list)
      }
    } catch (e) {
      showAlert("Chi tiết hóa đơn", "Lỗi hiển thị hóa đơn", false)
    }
  }

  useEffect(()=>{
    getThongTinHD(idHD)
  }, [])

  const thanhToan = () => {
    if(isActiveThanhToan){
      setModalThanhToanVisible(true);
    }    
    // if(isActiveThanhToan){
    //   //Chuyển đến màn hình thanh toán
    //   showAlert("Bạn có muốn thanh toán ?", "Thanh toán hóa đơn " + maHD, true)
    //   .then(async (result) => {
    //     if (result) {      
    //       const res : any = await authenticationAPI.HandleAuthentication(
    //       '/khachhang/thanhtoan/payZalo' + "/" + idHD,
    //       {},
    //       'post')
    //       console.log(res)
    //       if(res.success === true){
    //         const orderUrl = res.index.order_url;
    //         Linking.openURL(orderUrl).catch((err) => {
    //           console.error('Failed to open URL:', err);
    //           // Handle error if unable to open URL
    //           showAlert("Không thể mở ZaloPay", "Đã xảy ra lỗi khi mở ZaloPay");
    //         });          }
    //     }
    //   })
    // } else {
    //   showAlert("Chưa thể thanh toán", "Quý khách vui lòng đợi đơn hàng được giao thành công để thực hiện giao dịch")
    // }
  }

  const generateRandomImageName = () => {
    const prefix = 'IMG_6314_'; // Tiền tố cố định
    const randomSuffix = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
    const extension = '.jpeg'; // Phần mở rộng của tệp
  
    return `${prefix}${randomSuffix}${extension}`;
  };

  const handleThanhToanSelect = async (selected: any) => {
    const ghiChuOption = selected.option1
    const uri = selected.uri
    if(ghiChuOption === 1 && uri === ""){
      showAlert("Thanh toán hóa đơn", "Mời bạn chọn ảnh xác nhận", false)
      return;
    }
    let res : any = {}
    if(ghiChuOption===1){
      const formData = new FormData();
      if (uri) {
        formData.append('hinhAnhXacNhan', {
          uri: uri,
          name: generateRandomImageName(), // Tên của hình ảnh
          type: 'image/jpeg', // Loại của hình ảnh
        });
      }
      formData.append('ghiChu', ghiChuOption===0?"Yêu cầu xác nhận thanh toán bằng tiền mặt":"Yêu cầu xác nhận thanh toán chuyển khoản");
      formData.append('phuongThucThanhToan', ghiChuOption);
      res = await authenticationAPI.HandleAuthentication(
        '/khachhang/hoadon/' + "thanh-toan-chuyen-khoan" + "/" + idHD,
        formData,
        'post',
      );
    } else {
      res = await authenticationAPI.HandleAuthentication(
        '/khachhang/hoadon/' + "thanh-toan-tien-mat" + "/" + idHD,
        {ghiChu: ghiChuOption===0?"Yêu cầu xác nhận thanh toán bằng tiền mặt":"Yêu cầu xác nhận thanh toán chuyển khoản", phuongThucThanhToan: ghiChuOption},
        'post',
      );
    }
    // const res : any = DeleteResExample
    if(res.success === true){
      showAlert("Thanh toán hóa đơn", "Đã gửi yêu cầu quý khách vui lòng chờ bên cửa hàng xác nhận thanh toán thành công", false)
      setGhiChu(ghiChuOption===0?"Yêu cầu xác nhận thanh toán bằng tiền mặt":"Yêu cầu xác nhận thanh toán chuyển khoản")
      setPhuongThucThanhToan(ghiChuOption)
      return;
    }
    showAlert("Thanh toán hóa đơn", res.msg, false)
    return;
  };

  const huyHoaDon = () => {
    if(isActiveHuy){
      showAlert("Bạn có muốn hủy ?", "Hủy hóa đơn " + maHD, true)
      .then(async (result) => {
        if (result) {
          try{
            const res : any = await authenticationAPI.HandleAuthentication(
              '/khachhang/hoadon/delete' + "/" + idHD,
              {},
              'delete',
            );
            // const res : any = DeleteResExample
            if(res.success === true){
              showAlert("Hủy hóa đơn", "Hủy hóa đơn thành công", false)
              navigation.goBack()
              return;
            }
            showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại", false)
            return;
          }
          catch(e){
            showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại do đường truyền", false)
          }
        }
      })
      .catch(e => {
        // Handle error if necessary
        showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại do hệ thống", false)
      });
      return
    } else {
      if(trangThaiMua !== 0){
        if(trangThaiThanhToan === 1){
          showAlert("Không thể hủy", "Đơn hàng đã thanh toán không thể hủy")
          return;
        }
        showAlert("Không thể hủy", "Đơn hàng đang được giao không thể hủy liên hệ cửa hàng " + tenCH + " để nhận hỗ trợ")
        return;
      }
    }
    return;
  }

  const handleHinhAnhSelect = (selected: any) => {
    const uriImg = selected.uri
    setUri(uriImg)
  }

  const handleOr = async () => {
    const res : any = await authenticationAPI.HandleAuthentication(
      '/khachhang/thanhtoan/createQR/' + idHD,
      'get',
    );
    // const res : any = HoaDonResExample
    if (res.success === true) {
      const orderUrl = res.index;
      Linking.openURL(orderUrl).catch((err) => {
        console.error('Failed to open URL:', err);
        // Handle error if unable to open URL
        showAlert("Không thể mở QR code", "Đã xảy ra lỗi khi mở QR code");
      });          
    }
  }

  const MonItem = ({ item }: { item: any }) => {

    //openSearchScreen(item.idMon)
    const openSearchScreen = (idMon: string) => {
      navigation.navigate('DetailMonScreen', {
        idMon: idMon,
        showMoreContent: true,
        uniqueId: Math.random() 
      });
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={()=> openSearchScreen(item.idMon)} activeOpacity={0.7}>
        <Image style={styles.itemImage}
          source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')} 
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.tenMon}</Text>
          <Text style={styles.normal}>{formatCurrency(item.giaTienDat)}</Text>
          <Text style={styles.normal}>{item.soLuong}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>

    <View style={styles.wrapper}>
        <TextViewComponent
            leftText="Mã hóa đơn"
            rightText={maHD}
            rightBold={true}
        />
        <TextViewComponent
          leftText="Tên cửa hàng"
          rightText={tenCH}
        />
        <TextViewComponent
          leftText="Tên khách hàng"
          rightText={tenKH}
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
          leftText="Khuyến mãi"
          rightText={phanTramKhuyenMai + "%"}
        />  
        <TextViewComponent
          leftText="Phí giao hàng"
          rightText={phiVanChuyen}
        /> 
        <TextViewComponent
          leftText="Thành tiền"
          rightText={formatCurrency(thanhTien)}
          leftBold={true}
          backgroundColor={appColors.secondary}
          showBorderBottom={false}
        />
        <FlatList
          scrollEnabled={false}
          data={danhSachMonDat}
          renderItem={({ item }: any) => <MonItem item={item}/>}
          keyExtractor={(item : any) => item.idMD}
          />
        <TextViewComponent
          leftText="Thanh toán"
          rightText={formatTrangThaiThanhToan(trangThaiThanhToan)}
          rightColor={formatTrangThaiThanhToanColor(trangThaiThanhToan)}
        /> 
        <TextViewComponent
          leftText="Phương thức"
          rightText={phuongThucThanhToan===0?"Tiền mặt":"Chuyển khoản"}
        /> 
        {ghiChu !== "" && (
          <TextViewComponent
            leftText="Ghi chú"
            rightText={ghiChu}
          />
        )}
        <TextViewComponent
          leftText="Thời gian tạo"
          rightText={thoiGianTao}
        />
        {thoiGianDuyet !== "00:00:00 00:00" && (
        <TextViewComponent
          leftText="Thời gian duyệt"
          rightText={thoiGianDuyet}
        />
        )}
        {thoiGianGiaoHangDuKien !== "00:00:00 00:00" && (
          <TextViewComponent
            leftText="Dự kiến giao"
            rightText={thoiGianGiaoHangDuKien}
          />
        )}
        <TextViewComponent
          leftText="Giao hàng"
          rightText={formatTrangThaiGiaoHang(trangThaiMua)}
          rightColor={formatTrangThaiGiaoHangColor(trangThaiMua)}
        />
        <TextViewComponent
          leftText="Trạng thái"
          rightText={formatTrangThai(trangThai)}
          rightColor={formatTrangThaiColor(trangThai)}
        /> 
        {isActiveThanhToan && (
          <MyButtonComponent text="Thanh toán" onPress={thanhToan} color={(isActiveThanhToan)?appColors.primary:"gray"}/>
        )}
        {isActiveHuy && (
          <MyButtonComponent text="Hủy hóa đơn" onPress={huyHoaDon} color={(isActiveHuy)?appColors.primary:"gray"}/>
        )}
        <ImageVerificationOption
          visible={modalImageVisible}
          onSelect={handleHinhAnhSelect}
          onClose={() => setModalImageVisible(false)}
          optionalTitle="Chọn hình ảnh xác nhận"
          optionalDesc="Bạn có thể tải ảnh từ thư viện ảnh hoặc chụp trực tiếp ảnh chuyển khoản thành công"
          imgUrl={uri}
        />
        <ListOptionPicker
          visible={modalThanhToanVisible}
          optionalTitle={"Chọn phương thức thanh toán?"}
          optionalDesc={"Xác nhận thanh toán tiền mặt khi giao hàng thành công\n\nXác nhận thanh toán chuyển khoản cho hóa đơn đã duyệt"}
          onSelect={handleThanhToanSelect}
          onClose={() => setModalThanhToanVisible(false)}
          options={optionsLyDoThanhToan}
          onPickImage={() => setModalImageVisible(true)}
          imgUri={uri}
          handleQR={handleOr}
          initOption={phuongThucThanhToan}
        />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
});

export default DetailHoaDonScreen;
