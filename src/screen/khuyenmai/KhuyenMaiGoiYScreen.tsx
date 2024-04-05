import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appColors } from '../../constants/appColors';
import DeliveryNote from '../../component/detail/DeliveryNote';
import { BillCreateNote, Delivery } from '../../assest/svgs/index';
import { getData } from '../../utils/storageUtils';
import { showAlert } from '../../utils/showAlert';

const KhuyenMaiGoiYScreen: React.FC<NavProps> = ({ navigation }) => {
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState<any[]>([]);
  const [addedItems, setAddedItems] = useState<string[]>([]); // Array of _id
  // Dữ liệu khuyến mãi
  const DanhSachkhuyenMaiData = {
    success: true,
    list: [
      {
        "id": "1",
        "idKM": "65fdad5e7e6f48a8b5b74e18",
        "tieuDe": "Hàng",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 100,
        "donToiThieu": 1111
      },
      {
        "id": "2",
        "idKM": "65fdad5e7e6f48a8b5b74e18",
        "tieuDe": "Hàng",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 100,
        "donToiThieu": 1111
      },
      {
        "id": "3",
        "idKM": "65fdad5e7e6f48a8b5b74e18",
        "tieuDe": "Hàng",
        "ngayBatDau": "2024-03-22",
        "ngayHetHan": "2024-03-22",
        "phanTramKhuyenMai": 100,
        "donToiThieu": 1111
      },
      // Add more items here...
    ],
    count: 3,
    totalPages: 1,
    currentPage: 1,
    msg: "Thêm món thành công"
  };

  useEffect(() => {
    getDanhSacHkhuyenMai();
  }, []);

  const getDanhSacHkhuyenMai = async () => {
    try {
      const res: any = DanhSachkhuyenMaiData;

      if (res.success === true) {
        const { list } = res;
        setDanhSachKhuyenMai(list);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isItemAdded = (itemId: any) => {
    return addedItems.includes(itemId);
  };

  const handleAddItem = (itemId: any) => {
    if (!isItemAdded(itemId)) {
      showAlert("Bạn có muốn thêm ?", "Thêm vào khuyến mãi của bạn.", true)
        .then(result => {
          if (result) {
            try {
              const res: any = DanhSachkhuyenMaiData; // Giả sử API trả về thành công
  
              if (res.success === true) {
                setAddedItems(prevItems => [...prevItems, itemId]);
                console.log(res)
                showAlert("Thêm khuyến mãi", res.msg, false);
              } else {
                showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
              }
            } catch (e) {
              showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
            }
          }
        })
        .catch(e => {
          showAlert("Thêm khuyến mãi", "Thêm khuyến mãi thất bại", false);
        });
    } else {
      showAlert("Thông báo", "Khuyến mãi đã được thêm trước đó", false);
    }
  };

  const handleDetails = (item: any) => {
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

  const renderItem = ({ item }: { item: any }) => (
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
        <TouchableOpacity style={[styles.buttonAdd, { backgroundColor: isItemAdded(item.id) ? 'gray' : appColors.primary }]} onPress={() => handleAddItem(item.id)}>
          <Text style={styles.buttonThem}>{isItemAdded(item.id) ? 'Đã thêm' : 'Thêm'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDetails} onPress={() => handleDetails(item)}>
          <Text style={styles.buttonChiTiet}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
          data={danhSachKhuyenMai}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginRight: 150,
    alignItems: 'center',

  },
  buttonAdd: {
    width: 100,
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
  }
});

export default KhuyenMaiGoiYScreen; 