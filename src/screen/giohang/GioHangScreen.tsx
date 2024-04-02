import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, Alert  } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import FloatingButton from '../../component/giohang/FloatingButton';
import { faShoppingCart, faReceipt, faPlus, faCheckCircle , faCircle } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import { getData } from '../../utils/storageUtils';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { appFontSize } from '../../constants/appFontSizes';
import { appImageSize } from '../../constants/appImageSize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote, Delivery } from '../../assest/svgs/index';

const DanhSachGioHangResExample = {
  success: true,
  list: [
    {
      idGH: "1",
      tenMon: "Banh Flan",
      tenLM: "Tráng Miệng",
      tenCH: "Five Star",
      idMon: "1",
      idCH: "2",
      giaTien: 20000,
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
    },
    {
      idGH: "2",
      tenMon: "Banh Flan",
      tenLM: "Tráng Miệng",
      tenCH: "Five Star",
      idMon: "2",
      idCH: "2",
      giaTien: 25000,
      hinhAnh: "http://10.0.2.2:3000/public/images/kudo.jpeg"
    },
    {
      idGH: "3",
      tenMon: "Banh Flan",
      tenLM: "Tráng Miệng",
      tenCH: "Five Star",
      idMon: "3",
      idCH: "3",
      giaTien: 15000,
      hinhAnh: ""
    }
  ],
  count: 3,
  msg: ""
}

const GioHangScreen: React.FC<NavProps> = ({ navigation }) => {
  const route : any = useRoute();
  const [idKH, setIdKH] = useState("");
  const [danhSachGioHang, setDanhSachGioHang] = useState<any[]>([]);
  const isFocused = useIsFocused();
  let saveList: any[] = [];

  const handleSaveItem = (item: any, isSelected: boolean) => {
    console.log(isSelected)
    if (isSelected) {
      const index = saveList.findIndex((savedItem) => savedItem.idGH === item.idGH);
      if (index === -1) {
        saveList.push(item);
      }
    } else {
      const index = saveList.findIndex((savedItem) => savedItem.idGH === item.idGH);
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
    const fetchData = async () => {
      const khachHangId = await getKhachHang();
      await getDanhSachGioHang(khachHangId);
      
      setIdKH(khachHangId);
    };
  
    if (isFocused) {
      fetchData();
    }
  }, [isFocused])

  const getDanhSachGioHang = async(id: string)=>{
    if(!id){return}

    try {
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/khachhang/gioHang' + "/" + id,
      //   'get',
      // );
      const res : any = DanhSachGioHangResExample

      if (res.success === true) {
        const { list, count, currentPage, totalPage } = res;
        setDanhSachGioHang(list);
      }
    } catch (e) {
      console.log(e);
    }
  }


  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log(title) },
      ],
      { cancelable: false }
    );
  };
  
  const taoHoaDon = () => {
    if(saveList.length == 0){
      showAlert("Không thể tạo đơn hàng!", "Quý khách hàng vui lòng chọn món trước")
      return;
    }
    const firstStoreId = saveList[0].idCH;
    const isInSameStore = saveList.every(item => item.idCH === firstStoreId);
    if (isInSameStore) {
      navigation.navigate('AddHoaDonScreen', {
        saveList: saveList // Danh sách những món sẽ đặt
      });
    } else {
      showAlert("Không thể tạo đơn hàng!", "Quý khách hàng vui lòng chọn các món thuộc cùng một cửa hàng")
      return
    }
  };

  // Component riêng cho mỗi item trong danh sách
  const GioHangItem = ({ item , onSaveItem }: { item: any, onSaveItem: Function }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleItemPress = (select: boolean) => {
      onSaveItem(item,!select);
      setIsSelected(!select);
    };

    //openSearchScreen(item.idMon)
    const openSearchScreen = (idMon: string) => {
      navigation.navigate('DetailMonScreen', {
        idMon: idMon,
        showMoreContent: true,
        uniqueId: Math.random() 
      });
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(isSelected)} onLongPress={()=> openSearchScreen(item.idMon)} activeOpacity={0.7}>
        <View style={styles.checkboxContainer}>
          <FontAwesomeIcon
            icon={isSelected ? faCheckCircle : faCircle}
            style={[
              styles.checkboxIcon as ViewStyle,
              !isSelected && styles.circleIcon as ViewStyle
            ]}
          />
        </View>
        <Image style={styles.itemImage}
          source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')} 
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.tenMon}</Text>
          <Text style={styles.normal}>{item.tenCH}</Text>
          <Text style={styles.normal}>{item.giaTien}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.contain}>
      <ScrollView>
          <DeliveryNote
            title="Ấn vào nút bên dưới để tạo hóa đơn "
            mainText="Hãy chọn những đơn cùng cửa hàng!"
            icon={<BillCreateNote />}
            backgroundColor={appColors.lighterOrange}
          />
          <FlatList
            scrollEnabled={false}
            data={danhSachGioHang}
            renderItem={({ item }: any) => <GioHangItem item={item} onSaveItem={handleSaveItem}/>}
            keyExtractor={(item : any) => item.idGH}
          />
      </ScrollView>
      <FloatingButton
        onPressItem={taoHoaDon}
        buttonColor={appColors.primary} // Example custom button color
        iconColor={appColors.white} // Example custom icon color
        icon={faPlus} // Pass the icon
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  //Item
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
  checkboxContainer: {
    marginRight: 10,
  },
  checkboxIcon: {
    color: appColors.primary
  },
  circleIcon: {
    color: appColors.boderColor, // Make the circle transparent
  },
  itemImage: {
    width: appImageSize.size75.width,
    height: appImageSize.size75.height,
    borderRadius: 8,
    marginRight: 10
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column', // Change flex direction to column
  },
  itemName: {
    fontSize: appFontSize.normal,
    fontWeight: 'bold',
  },
  normal: {
    fontSize: appFontSize.normal,
    color: '#888',
  }
  //<==Item==>
});

export default GioHangScreen;
