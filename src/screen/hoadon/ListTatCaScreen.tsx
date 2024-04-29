import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import DropDownComponent from '../../component/DropDownComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HoaDon} from '../../models/HoaDon';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {getData} from '../../utils/storageUtils';
import {useIsFocused} from '@react-navigation/native';
import ListHoaDonComponent from '../../component/ListHoaDonComponent';
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
  const [startDate, setStartDate] = useState<Date>();
  const [andDate, setAndDate] = useState<Date>();
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
    await getListInvoice(code, item.value, payment, startDate, andDate, page);
  };
  const handleSelectItemPayment = async (item: any) => {
    await getListInvoice(code, purchase, item.value, startDate, andDate, page);

    // await getListInvoice(page,code,item.value,payment);
  };

  const actionSearch = async (item: string) => {
    await getListInvoice(item, purchase, payment, startDate, andDate, page);
  };

  const searchStartDate = (item: Date | string) => {
    setStartDate(item as Date);
  };

  const handleSelectStartDate = async (dateStart: Date | string) => {
    setStartDate(dateStart as Date);
    await getListInvoice(code, purchase, payment, dateStart, andDate, page);
  };
  const searchEndDate = (item: Date | string) => {
    setAndDate(item as Date);
  };

  const handleSelectEndDate = async (dateEnd: Date | string) => {
    setAndDate(dateEnd as Date);
    await getListInvoice(code, purchase, payment, startDate, dateEnd, page);
  };

  const handelDetail = (item: any) => {
    navigation.navigate('DetailHoaDonScreen', {
      idHD: item._id,
    });
  };

  const handleGetAll = async () => {
    await getListInvoice(code, purchase, payment, startDate, andDate, page + 1);
  };

  const getListInvoice = async (
    code?: any,
    purchaseStatus?: any,
    paymentStatus?: any,
    startDate?: any,
    endDate?: any,
    page?: any,
  ) => {
    try {
      // setLoading(true); // Set loading to true before making the API call
      const user = await getData();
      const idUser = user?.idKH;
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/hoaDon/${idUser}?maHD=${code}&trangThaiMua=${purchaseStatus}&trangThaiThanhToan=${paymentStatus}&ngayBatDau=${startDate}&ngayKetThuc=${endDate}&trang=${page}`,
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
      setPurchase(purchaseStatus);
      setPayment(paymentStatus);
      setStartDate(startDate);
      setAndDate(endDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getListInvoice('', '', '', '', '', 1);
    }
  }, [isFocused]);
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
          <View style={styles.selectDate}>
            <EditTextComponent
              label="date"
              placeholder="Ngày bắt đầu"
              value={startDate ? startDate.toString() : ''} // Convert
              stylesEdit={{backgroundColor: 'white'}}
              onChangeText={(text: string) => searchStartDate(text)}
              stylesContainer={{
                borderColor: 'black',
                borderWidth: 1.5,
                elevation: 0,
                width: '45%',
              }}
              onDateSelected={item => handleSelectStartDate(item)}
              iconColor={appColors.primary}
            />

            <EditTextComponent
              label="date"
              placeholder="Ngày kết thúc"
              value={andDate ? andDate.toString() : ''} // Convert
              stylesEdit={{backgroundColor: 'white'}}
              onChangeText={(text: string) => searchEndDate(text)}
              stylesContainer={{
                backgroundColor: appColors.white,
                borderColor: 'black',
                borderWidth: 1.5,
                elevation: 0,
                width: '45%',
              }}
              onDateSelected={item => handleSelectEndDate(item)}
              iconColor={appColors.primary}
            />
          </View>

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
                không tìm thấy hoá đơn
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await getListInvoice('', '', '', '', '', 1), setPage(1);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                    color: appColors.primary,
                    textDecorationLine: 'underline',
                  }}></Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ListHoaDonComponent
              data={data}
              handleDetail={handelDetail}
              handleGetAll={handleGetAll}
              text={text}
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
    marginBottom: 10,
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
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: appColors.white,
    elevation: 10,
  },
  selectDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListTatCaScreen;
