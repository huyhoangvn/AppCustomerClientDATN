import React, { useEffect, useMemo, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import authenticationAPI from '../../apis/authApi';
import LoadingComponent from '../../component/LoadingComponent';
import AlertComponent from '../../component/AlertComponent';
import ButtonComponent from '../../component/ButtonComponent';

const DetailHoaDonScreen: React.FC<NavProps> = ({navigation,route} : any) => {
  const {id } = route.params;
  console.log("🚀 ~ id:", id)
  
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [item, setItem] = useState<any>();

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handelViewDish = () => {
    navigation.navigate('DetailDatMonScreen', {dish: item?.monDat});
    console.log("🚀 ~ handelViewDish ~ item?.monDat:", item?.monDat)
  }
  const handelUpdateInvoice = () => {

  }

 

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return 'Chờ duyệt';
      case 1:
        return 'Đang chuẩn bị';
      case 2:
        return 'Đang giao hàng';
      case 3:
        return 'Giao hàng thành công';
      case 4:
        return 'Giao hàng thất bại';
      default:
        return 'Trạng thái không xác định';
    }
  };

  const calculateMoney = useMemo(() => {
    if (item && typeof item?.tongTien === 'number' && typeof item?.phanTramKhuyenMaiDat === 'number') {
        if (item?.phanTramKhuyenMaiDat === 0) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.tongTien);
        } else {
            const money = item?.tongTien - (item?.tongTien * item?.phanTramKhuyenMaiDat / 100);
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
        }
    }
    return '0 VND';
}, [item]);

  const getDetailInvoice = async ( ) => {
    try {
      setLoading(true);
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/hoaDon/detail/${id}`,
        'get',
      );
        
      if (res.success === true) {
        setItem(res.hoaDon)
      } else {
        // Xử lý khi có lỗi từ API
        setMsg('Request failed. Please try again.');
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetailInvoice()
  },[])

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.viewText}>
          <Text>Mã hoá đơn</Text>
          <Text style={styles.textPrimary}>{item?.maHD}</Text>
        </View>

        <View style={styles.viewText}>
          <Text>Tên cửa hàng</Text>
          <Text style={styles.textPrimary}>
            {item?.tenCH}
          </Text>
        </View>

        <View style={styles.viewText}>
          <Text>Tên khách hàng</Text>
          <Text style={styles.textPrimary}>{item?.tenKH}</Text>
        </View>

        <View style={styles.viewText}>
          <Text>Địa chỉ giao hàng</Text>
          <Text
            style={[styles.textPrimary, styles.wrapText, styles.addressText]}>
            {item?.diaChiGiaoHang}
          </Text>
        </View>

        <View style={styles.viewText}>
          <Text>Thời gian dự kiến</Text>
          <Text style={styles.textPrimary}>{item?.thoiGianGiaoHangDuKien}</Text>
        </View>

      

        <View style={styles.viewText}>
          <Text>Ghi chú</Text>
          <Text style={styles.textPrimary}>
            {item?.ghiChu}
          </Text>
        </View>

        <View style={styles.viewText}>
          <Text>Khuyến mãi</Text>
          <Text style={styles.textPrimary}>
            {item?.phanTramKhuyenMaiDat} %
            </Text>
        </View>
        <View style={styles.viewText}>
          <Text>Tổng tiền</Text>
          <Text style={styles.textPrimary}>
            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.tongTien)}
            </Text>
        </View>

        
        <View style={[styles.viewText,{backgroundColor: appColors.secondary}]}>
          <Text>Thành tiền</Text>
          <Text style={styles.textPrimary}>
            {calculateMoney}
            </Text>
        </View>
        <View style={styles.viewText}>
          <View style= {{height: 45 ,justifyContent: 'center'}}>
          <Text>Giao Hàng</Text>
          </View>
          <View style = {{backgroundColor: appColors.colorFb, height: 45,width:170, borderRadius: 25,justifyContent: 'center'}}>
              <Text style = {[styles.textPrimary,{color: appColors.white}]}>{getStatusText(item?.trangThaiMua)}</Text>
          </View> 
        </View>


        <View style={[styles.viewText]}>
          <View style= {{height: 45 ,justifyContent: 'center'}}>
          <Text>Thanh toán</Text>
          </View>
          <View style = {{backgroundColor: appColors.green, height: 45,width:170, borderRadius: 25,justifyContent: 'center'}}>
          {item?.trangThaiThanhToan === 0 ? (
              <Text style={[styles.textPrimary,{color: appColors.white}]}> Chưa thanh toán</Text>
            ) : (
              <Text style={[styles.textPrimary,{color: appColors.white}]}> Đã thanh toán</Text>
            )}
          </View> 
        </View>
      </View>
      <View style={styles.footer}>
      <ButtonComponent
            type="primary"
            text="Xem đặt món"
            textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={handelViewDish}
          />
              <ButtonComponent
            type="primary"
            text="Sửa hoá đơn"
            textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={handelUpdateInvoice}
          />
      </View>
      <View>
      <LoadingComponent visible={loading} />
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
      </View>
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 5,
    justifyContent: 'space-between',
  },
  footer: {
    flex: 1,
    paddingTop: 15
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 13,
    justifyContent: 'space-between',
  },
  textPrimary: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  wrapText: {
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  addressText: {
    width: '70%', // Chiếm 50% chiều rộng của View cha
    // Các style khác cho văn bản địa chỉ
  },
});

export default DetailHoaDonScreen;
