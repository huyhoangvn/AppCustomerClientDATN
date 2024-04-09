import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faCalendarDays,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import DropDownComponent from '../../component/DropDownComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {text} from '@fortawesome/fontawesome-svg-core';
import {HoaDon} from '../../models/HoaDon';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {getData} from '../../utils/storageUtils';
import EditText from '../../component/edittext/EditText';
import {appFontSize} from '../../constants/appFontSizes';
import { TouchableHighlight } from 'react-native-gesture-handler';
const ListTatCaScreen: React.FC<NavProps> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [text, setText] = useState('Xem thêm');
  const [data, setData] = useState<HoaDon[]>([]);
  const [dataNew, setDataNew] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const [purchase, setPurchase] = useState('');
  const [payment, setPayment] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [position, setPosition] = useState<any>();
  const statusPurchase = [
    {label: 'Tất cả', value: ''},
    {label: 'Chờ duyệt', value: 0},
    {label: 'Đang chuẩn bị', value: 1},
    {label: 'Đang giao hàng', value: 2},
    {label: 'Giao hàng thành công', value: 3},
    {label: 'Giao hàng thất bại', value: 4},
  ];

  const statusPayment = [
    {label: 'Tất cả', value: ''},
    {label: 'Chưa thanh toán', value: 0},
    {label: 'Đã thanh toán', value: 1},
  ];
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
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSelectItemPurchase = async (item: any) => {
    await getListInvoice(code, date, item.value, payment, page);
  };
  const handleSelectItemPayment = async (item: any) => {
    await getListInvoice(code, date, purchase, item.value, page);

    // await getListInvoice(page,code,item.value,payment);
  };
  
  const actionSearch = async (item: string) => {
    await getListInvoice(item, date, purchase, payment, page);
  };

  const searchDate = (item: Date | string) => {
    setSelectedDate(item as Date);
  };

  const handleDateSelected = async (date: Date | string) => {
    setSelectedDate(date as Date);

    await getListInvoice(code, date, purchase, payment, page);
  };

  const handelDetail = (item: any) => {
    navigation.navigate('DetailHoaDonScreen', {
      id: item._id,
    });
  };

  const handleGetAll = async () => {
    await getListInvoice(code, date, purchase, payment, page + 1);
  };

  const getListInvoice = async (
    code?: any,
    date?: any,
    purchaseStatus?: any,
    paymentStatus?: any,
    page?: any,
  ) => {
    try {
      setLoading(true); // Set loading to true before making the API call
      const user = await getData();
      const idUser = user?.idKH;
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/hoaDon/${idUser}?maHD=${code}&thoiGianTao=${date}&trangThaiMua=${purchaseStatus}&trangThaiThanhToan=${paymentStatus}&trang=${page}`,
        'get',
      );

      if (res.success === false) {
        if (!res.list) {
          return;
        }
        return;
      }

      if (page === 1) {
        setData([...res.list]);
      } else {
        setData(prevData => [...prevData, ...res.list]);
      }
      if (res.list.length > 0) {
        setPage(page);
        setText(res.list.length === 10 ? 'Xem Thêm' : 'Hết');
      } else {
        setText('Hết');
      }
      setCode(code);
      setDate(date);
      setPurchase(purchaseStatus);
      setPayment(paymentStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateTimeString: any) => {
    const dateTime = new Date(dateTimeString);

    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // JavaScript month is zero-based
    const year = dateTime.getFullYear();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${
      month < 10 ? '0' : ''
    }${month}/${year}`;

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;

    return {formattedDate, formattedTime};
  };


  useEffect(() => {
    getListInvoice('', '', '', '', 1);
  }, []);

  const renderItem = ({item}: {item: HoaDon}) => {
    const {formattedDate, formattedTime} = formatDate(item.thoiGianTao);
    return (
      <TouchableHighlight   underlayColor="#F2F2F2" // Màu sắc khi chạm vào
      onPress={() => handelDetail(item)}>
        <View style={styles.item}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              MHD:{item.maHD}
            </Text>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Tổng tiền:{' '}
              {parseInt(item.tongTien || '').toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {/* {item.trangThaiMua === 1 ? "ok" : "Chưa mua"} */}
              Trạng thái mua: {getStatusText(item.trangThaiMua ?? 0)}
            </Text>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Thanh toán:
              {item.trangThaiThanhToan === 0 ? (
                <Text style={{color: 'red'}}> Chưa thanh toán</Text>
              ) : (
                <Text style={{color: 'green'}}> Đã thanh toán</Text>
              )}
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Ngày tạo: {formattedDate || ''} - {formattedTime || ''}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1}}
      // Tùy chỉnh khoảng cách cuộn thêm khi bàn phím hiển thị
    >
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={styles.header}>
          <EditTextComponent
            label="iconRight"
            placeholder="Nhập mã hoá đơn"
            iconRight={faMagnifyingGlass}
            stylesEdit={{backgroundColor: 'white'}}
            onChangeText={(text: string) => actionSearch(text)}
            stylesContainer={{
              backgroundColor: appColors.white,
              borderColor: 'black',
              borderWidth: 1.5,
              elevation: 1,
            }}
            iconColor={appColors.primary}
          />

          <EditTextComponent
            label="date"
            placeholder="Chọn ngày"
            value={selectedDate ? selectedDate.toString() : ''} // Convert
            stylesEdit={{backgroundColor: 'white'}}
            onChangeText={(text: string) => searchDate(text)}
            stylesContainer={{
              backgroundColor: appColors.white,
              borderColor: 'black',
              borderWidth: 1.5,
              elevation: 0,
            }}
            onDateSelected={item => handleDateSelected(item)}
            iconColor={appColors.primary}
          />
          <View style={styles.viewDropDow}>
            <DropDownComponent
              label="Select Item" // Nhãn cho DropDownComponent
              value={selectedItem} // Giá trị được chọn
              items={statusPurchase.map(item => ({
                label: item.label,
                value: item.value.toString(),
              }))} // Danh sách các mục
              containerStyle={{
                width: wp(55),
                borderRadius: 100,
                maxHeight: 200,
              }}
              onChangeItem={item => {
                handleSelectItemPurchase(item);
              }}
              placeholder="Trạng thanh toán"
            />

            <DropDownComponent
              label="Select Item" // Nhãn cho DropDownComponent
              value={selectedItem} // Giá trị được chọn
              items={statusPayment.map(item => ({
                label: item.label,
                value: item.value.toString(),
              }))} // Danh sách các mục
              defaultValue="item1"
              containerStyle={{width: wp(35), maxHeight: 200}}
              placeholder="Trạng thái thanh toán"
              onChangeItem={item => {
                handleSelectItemPayment(item);
              }}
            />
          </View>
        </View>

        <View style={styles.main}>
          {data.length === 0 ? (
            <View style={{height: hp(100)}}>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                không tìm thấy nhân viên
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await getListInvoice('', '', '', '', 1), setPage(1);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                    color: appColors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  Trở lại
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item._id || ''}
              scrollEnabled={true}
              style={{height: hp(80)}}
              // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
              // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
              // onEndReachedThreshold={.1}
              ListFooterComponent={() => (
                <View style={{alignItems: 'center', paddingVertical: 10}}>
                  <TouchableOpacity onPress={handleGetAll}>
                    <Text style={{fontSize: appFontSize.normal}}>{text}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        <View>
          <LoadingComponent visible={loading} />
          <AlertComponent
            visible={showAlert}
            message={msg}
            onClose={handleCloseAlert}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    marginBottom: 10
  },
  viewDropDow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    flex: 2,
  },

  item: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: appColors.white,
    paddingBottom: 20,
    elevation: 10
  },
});

export default ListTatCaScreen;
