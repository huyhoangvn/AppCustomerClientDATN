import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote, Delivery } from '../../assest/svgs/index';
import { getData } from '../../utils/storageUtils';
import { showAlert } from '../../utils/showAlert';

const KhuyenMaiCuaBanScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [khuyenMai, setKhuyenMai] = useState<any[]>([]);
  const [saveList, setSaveList] = useState<any[]>([]);
  const [idKM, setIdKM] = useState("");
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState<any[]>([]);

  // Dữ liệu khuyến mãi
  
  const DanhSachkhuyenMaiData = {
    success: true,
    list: [
      {
        "_id": "660a848a2f8795bd8d11ffd1",
        "idKM": "65fdad5e7e6f48a8b5b74e18",
        "tieuDe": "Hàng",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 100,
        "donToiThieu": 1111
      },
      {
        "_id": "660a848a2f8795bd8d11ffd2",
        "idKM": "65fdad5e7e6f48a8b5b74e17",
        "tieuDe": "Hàng FreeShip",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 30,
        "donToiThieu": 1111
      }, {
        "_id": "660a848a2f8795bd8d11ffd1",
        "idKM": "65fdad5e7e6f48a8b5b74e19",
        "tieuDe": "Mã giảm giá trong ngay",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 70,
        "donToiThieu": 1111
      },
    ],
    count: 2,
    totalPages: 1,
    currentPage: 1,
    msg: ""
  }
  const handleSaveItem = (item: any, isSelected: boolean) => {
    console.log(isSelected)
    if (isSelected) {
      const index = saveList.findIndex((savedItem) => savedItem.idKM === item.idKM);
      if (index === -1) {
        saveList.push(item);
      }
    } else {
      const index = saveList.findIndex((savedItem) => savedItem.idKM === item.idKM);
      if (index !== -1) {
        saveList.splice(index, 1);
      }
    }
    console.log(saveList)
  };
  const getKhachHang = async () => {
    const storedData = await getData();
    return storedData?.idKH || "";
  }
  
  useEffect(() => {
  
    getDanhSacHkhuyenMai();

    },[]);
    const getDanhSacHkhuyenMai = async()=>{

    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/gioHang' + "/" + id,
      //   'get',
      // );
      const res : any = DanhSachkhuyenMaiData;
      console.log(res);

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setDanhSachKhuyenMai(list);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleDetails = (item: any) => {
    // Hiển thị cảnh báo chi tiết dữ liệu
    Alert.alert(
      'Chi tiết',
      `Tiêu đề: ${item.tieuDe}\nPhần trăm khuyến mãi: ${item.phanTramKhuyenMai}%\nNgày bắt đầu: ${item.ngayBatDau}\nNgày kết thúc: ${item.ngayHetHan}\nĐơn tối thiểu: ${item.donToiThieu}`,
      [
        {
          text: 'Đóng',
          onPress: () => console.log('Đóng cửa sổ cảnh báo'),
        },
      ],
      { cancelable: false }
    );
  };
  const handleNavigateToKhuyenMaiCuaBanScreen = () => {
    navigation.navigate('KhuyenMaiCuaBanScreen', { handleSaveItem });
  };
  const showAlert = (item: any,message: any ) =>{
    Alert.alert(
      item,
      message,
      [
        {
           text: 'ok',
           onPress: () => console.log('ok'),
        },
      ],
      { cancelable: false}
    )
  } 
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Tiêu đề: {item.tieuDe}</Text>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black'}}>Phần trăm khuyến mãi: {item.phanTramKhuyenMai}%</Text>
      <View style={styles.dateContainer}>
        <View style={styles.date}>
          <Text>{item.ngayBatDau}</Text>
        </View>
        <View style={styles.dateHetHan}>
          <Text>{item.ngayHetHan}</Text>
        </View>
      </View>
      {/* <Text>Đơn tối thiểu: {item.donToiThieu}</Text> */}
      <View style={styles.buttonContainer}>
         {/* Nút điều hướng đến KhuyenMaiCuaBanScreen */}
         <TouchableOpacity style={styles.buttonAdd} onPress={() => handleSaveItem(item, true)}>
          <Text style={styles.buttonThem}>Thêm</Text>
        </TouchableOpacity>
        {/* Nút hiển thị chi tiết */}
        <TouchableOpacity style={styles.buttonDetails} onPress={() => handleDetails(item)}>
          <Text style={styles.buttonChiTiet}>Chi tiết</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
          <ScrollView>
        
          <FlatList
            scrollEnabled={false}
            data={danhSachKhuyenMai}
            renderItem={renderItem}
            keyExtractor={(item : any) => item.id}
            />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    margin:5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Thay đổi space-around thành space-between
  },
  buttonDetails: {
    backgroundColor:'#424ec4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 150,
  },
  buttonAdd: {
    backgroundColor:appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,

  },
  buttonChiTiet: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonThem:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  date: {
    justifyContent:'space-between'
  },
  dateHetHan:{
    marginRight: 170,
  }
});

export default KhuyenMaiCuaBanScreen; 