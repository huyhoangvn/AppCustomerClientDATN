import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote, Delivery } from '../../assest/svgs/index';
import { getData } from '../../utils/storageUtils';
import { showAlert } from '../../utils/showAlert';
import authenticationAPI from '../../apis/authApi';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faTimes } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useIsFocused, useRoute } from '@react-navigation/native';

const KhuyenMaiCuaBanScreen: React.FC<NavProps> = ({ navigation, route }:any) =>  {
  const [saveList, setSaveList] = useState<any[]>([]);
  const [idKM, setIdKM] = useState("");
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState<any[]>([]);
  const [addedItems, setAddedItems] = useState<any[]>([]); 
  const [msg, setMsg] = useState('');
  const [khuyenMai, setKhuyenMai] = useState<{[key: string]: boolean}>({});
  const isFocused = useIsFocused();

  // Dữ liệu khuyến mãi

  useEffect(() => {
    if(isFocused){
      getDanhSacHkhuyenMai();
    }
    },[isFocused]);
   
   const getDanhSacHkhuyenMai = async()=>{
    try {
      const reslut = await getData();
      const idKH = reslut?.idKH;
      const res : any = await authenticationAPI.HandleAuthentication(
        `/khachhang/khuyenmaicuatoi/danh-sach/${idKH}`,
        'get',
      );
      if (res.success === true) {
        setDanhSachKhuyenMai(res.list);
        setMsg(msg);
      }
      else{
        setMsg(msg);
      }
    } catch (e) {
      console.log(e);
      setMsg(msg);

    }
  }
 
  const removeFromList = async (idKM: any) => {
    console.log(idKM);
    if (!isItemAdded(idKM)) {
      showAlert("Bạn có muốn xóa ?", "Xóa vào khuyến mãi của bạn.", true)
        .then(async (result) => {
          if (result) {
            try {
              const reslut = await getData();
              const idKH = reslut?.idKH;
              const res: any = await authenticationAPI.HandleAuthentication(
                `/khachhang/khuyenmaicuatoi/${idKM}`,
                {
                  idKH: idKH,
                },
                'delete' 
              );
              if (res.success === true) {
                const updatedDanhSachDatMon = danhSachKhuyenMai.filter(item => item._id !== idKM);
                setDanhSachKhuyenMai(updatedDanhSachDatMon);
                showAlert("Xóa khuyến mãi", res.message, false);
              } else {
                showAlert("Xóa khuyến mãi", "Xóa khuyến mãi thất bại", false);
              }
            } catch (e) {
              showAlert("Xóa khuyến mãi", "Xóa khuyến mãi thất bại", false);
            }
          }
        })
        .catch((e) => {
          showAlert("Xóa khuyến mãi", "Xóa khuyến mãi thất bại", false);
        });
    } else {
      showAlert("Thông báo", "Khuyến mãi đã được Xóa trước đó", false);
    }
  };
  const isItemAdded = (itemId: any) => {
    return addedItems.includes(itemId);
  };

  const handleDetails = (item: any) => {
    // Hiển thị cảnh báo chi tiết dữ liệu
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

  // const showAlert = (item: any,message: any ) =>{
  //   Alert.alert(
  //     item,
  //     message,
  //     [
  //       {
  //          text: 'ok',
  //          onPress: () => console.log('ok'),
  //       },
  //     ],
  //     { cancelable: false}
  //   )
  // } 
  const renderItem = ({ item }: { item: any }) => {
  
    return(
      <View style={styles.itemContainer}>
      <View style={styles.itemHeal}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.tieuDe}
      </Text>
      <TouchableOpacity onPress={() => removeFromList(item._id)}>
        <FontAwesomeIcon icon={faTimes} size={appIcon.normal} />
      </TouchableOpacity>
     </View>
      
      <Text style={{fontSize:16, color:'black'}}>Giảm {item.phanTramKhuyenMai}% hóa đơn</Text>
     
      {/* <Text>Đơn tối thiểu: {item.donToiThieu}</Text> */}
      <View style={styles.buttonContainer}>
         {/* Nút điều hướng đến KhuyenMaiCuaBanScreen */}
         
        {/* Nút hiển thị chi tiết */}
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
        
          <FlatList
            scrollEnabled={false}
            data={danhSachKhuyenMai}
            renderItem={renderItem}
            keyExtractor={(item : any) => item.idKM}
            />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  
  itemContainer: {
    padding: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonDetails: {
    backgroundColor: '#424ec4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonChiTiet: {
    color: 'white',
    fontSize: 16,
  },
  buttonThem: {
    color: 'white',
    fontSize: 16,
  },
  
  itemHeal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  }
});

export default KhuyenMaiCuaBanScreen; 