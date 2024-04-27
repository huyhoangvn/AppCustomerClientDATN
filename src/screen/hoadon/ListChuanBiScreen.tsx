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
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HoaDon} from '../../models/HoaDon';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {getData} from '../../utils/storageUtils';
import {useIsFocused} from '@react-navigation/native';
import ListHoaDonComponent from '../../component/ListHoaDonComponent';
const ListChuanBiScreen: React.FC<NavProps> = ({navigation}) => {
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

  const actionSearch = async (item: string) => {
    await getListInvoice(item, 1, page);
  };

  const handelDetail = (item: any) => {
    navigation.navigate('DetailHoaDonScreen', {
      idHD: item._id,
    });
  };

  const handleGetAll = async () => {
    await getListInvoice(code, 1, page + 1);
  };

  const getListInvoice = async (
    code?: any,
    purchaseStatus?: any,
    page?: any,
  ) => {
    try {
      const user = await getData();
      const idUser = user?.idKH;
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/hoaDon/${idUser}?maHD=${code}&trangThaiMua=${purchaseStatus}&trang=${page}`,
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
      setDate(date);
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

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getListInvoice('', 1, page);
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
        </View>

        <View style={styles.main}>
          {data.length === 0 ? (
            <View style={{height: hp(100)}}>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                không tìm thấy hoá đơn
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await getListInvoice('', 1, 1), setPage(1);
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
    padding: 15,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: appColors.white,
    elevation: 10,
  },
});

export default ListChuanBiScreen;
