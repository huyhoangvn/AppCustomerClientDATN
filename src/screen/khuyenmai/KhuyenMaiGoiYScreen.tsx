import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote, Delivery } from '../../assest/svgs/index';
import { getData } from '../../utils/storageUtils';
import { showAlert } from '../../utils/showAlert';
import authenticationAPI from '../../apis/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { useIsFocused, useRoute } from '@react-navigation/native';
const KhuyenMaiGoiYScreen: React.FC<NavProps> = ({ navigation, route }:any) => {
  // Truy cập các tham số từ đối tượng route

  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState<any[]>([]);
  const [addedItems, setAddedItems] = useState<any[]>([]); 
  const [msg, setMsg] = useState('');
  const isFocused = useIsFocused();
  const [cartColor, setCartColor] = useState(appColors.gray);

  const [khuyenMai, setKhuyenMai] = useState<{[key: string]: boolean}>({});
  // Dữ liệu khuyến mãi
 

 

 
  useEffect(() => {
    if(isFocused){
      getDanhSacHkhuyenMai();
     //  loadDataFromStorage();
    }
  }, [isFocused]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getDanhSacHkhuyenMai();    
  //     return () => {
  //       // Cleanup logic nếu cần (không bắt buộc)
  //     };
  //   }, []),
  // );
  const saveAddedItems = async (items: string[]) => {
    try {
      await AsyncStorage.setItem('addedItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving added items:', error);
    }
  };
  
  const getDanhSacHkhuyenMai = async () => {
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/nhanvien/khuyenmai/khuyen-mai' ,
        'get',
      );
      console.log(res);
      // const res: any = DanhSachkhuyenMaiData;
      if (res.success === true) {
        const { list } = res;
        setDanhSachKhuyenMai(list);
        
      }
    } catch (e) {
      console.log(e);
    }
  };


//  const handleAddItem = async (idKM: string) => {
//     if (!isItemAdded(idKM)) {
//       showAlert("Bạn có muốn thêm ?", "Thêm vào khuyến mãi của bạn.", true)
//         .then(async (result) => {
//           if (result) {
//             try {
//               const reslut = await getData();
//               const idKH = reslut?.idKH;
//               const res: any = await authenticationAPI.HandleAuthentication(
//                 `/khachhang/khuyenmaicuatoi/${idKM}`,
//                 {
//                   idKH: idKH,
//                 },
//                 'post' 
//               );
//               if (res.success === true) {
//                 const updatedItems = [...addedItems, idKM];
//                 setAddedItems(updatedItems);
//                 setKhuyenMai((prevState) => ({ ...prevState, [idKM]: true }));
//                 saveAddedItems(updatedItems);
//                 showAlert("Thêm khuyến mãi", res.msg, false);
//               } else {
//                 showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
//               }
//             } catch (e) {
//               showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
//             }
//           }
//         })
//         .catch((e) => {
//           showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
//         });
//     } else {
//       showAlert("Thông báo", "Khuyến mãi đã được thêm trước đó", false);
//     }
//   };
const addKMCuaToi = async (idKM:any) => {
  try {  
    const reslut = await getData();
    const idKH = reslut?.idKH;
    if (!addedItems.includes(idKM)) { // Kiểm tra xem đã thêm hay chưa
      // Gọi API hoặc thực hiện xử lý logic để thêm khuyến mãi
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/khuyenmaicuatoi/${idKM}`,
        {
          idKH: idKH,
        },
        'post' 
      );
      if(res.success === true) {
        setMsg(res.msg);
        showAlert('Thêm vào khuyến mãi của bạn', "Khuyến mãi được lấy về " );
        console.log(res.msg);
        // Sau khi thêm thành công, cập nhật danh sách các khuyến mãi đã thêm
        const updatedItems = [...addedItems, idKM];
        setAddedItems(updatedItems);
        setKhuyenMai((prevState) => ({ ...prevState, [idKM]: true }));
        saveAddedItems(updatedItems);
        getDanhSacHkhuyenMai();

      } else {
        setMsg(res.msg);
      }
    } else {
      showAlert('Thông báo', 'Khuyến mãi đã được thêm trước đó', false);
    }
  } catch (error) {
    console.error(error);
  }
};


  const handleDetails = (item: any) => {
    Alert.alert(
      'Chi tiết',
      `Tiêu đề: ${item.tieuDe}\nMã khuyến mãi: ${item.maKhuyenMai}\nPhần trăm khuyến mãi: ${item.phanTramKhuyenMai}%\nNgày bắt đầu: ${item.ngayBatDau}\nNgày kết thúc: ${item.ngayHetHan}\nĐơn tối thiểu: ${item.donToiThieu}`,
      [
        {
          text: 'Đóng',
          onPress: () => console.log('Đóng cửa sổ cảnh báo'),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: { item: any }) =>
    {
      return(
        <View style={styles.itemContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tiêu đề: {item.tieuDe}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Phần trăm khuyến mãi: {item.phanTramKhuyenMai}%</Text>
  
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Text>{item.ngayBatDau}-</Text>
          </View>
          <View style={styles.dateHetHan}>
            <Text>{item.ngayHetHan}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.buttonAdd, item.trangThaiKM ? styles.buttonAdded : null]}
            onPress={() => addKMCuaToi(item._id)}
            disabled={item.trangThaiKM} // Không cho phép thêm nếu đã thêm
          >
            <Text style={styles.buttonThem}>
              {item.trangThaiKM ? 'Đã thêm' : 'Thêm'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDetails} onPress={() => handleDetails(item)}>
            <Text style={styles.buttonChiTiet}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
    }
  return (
    <View style={styles.container}>
      <ScrollView>
        <DeliveryNote
          title="Khuyến mãi của chúng tôi"
          mainText="Lưu vào để sử dụng các lần đặt sau!"
          icon={<BillCreateNote />}
          backgroundColor={appColors.khuyenMai}
        />
        <FlatList
          scrollEnabled={false}
          data={danhSachKhuyenMai}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.idKM}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDetails: {
    width: 100,
    backgroundColor: '#424ec4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 120,
    alignItems: 'center',

  },
  buttonAdd: {
    width: 100,
    backgroundColor:appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',

  },
  buttonChiTiet: {
    color: 'white',
    fontSize: 16,
  },
  buttonThem: {
    color: 'white',
    fontSize: 16,
    
  },
  dateContainer: {
    flexDirection: 'row',
  },
  date: {
    justifyContent:'space-around',
  },
  dateHetHan:{
  },
  buttonAdded:{
    backgroundColor: appColors.gray,
  }
});

export default KhuyenMaiGoiYScreen; 