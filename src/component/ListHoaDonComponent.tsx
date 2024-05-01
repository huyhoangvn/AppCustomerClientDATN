import { View, Text, TouchableHighlight, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { HoaDon } from '../models/HoaDon';
import { appColors } from '../constants/appColors';
import { appFontSize } from '../constants/appFontSizes';


interface Props {
    data: HoaDon[];
    handleGetAll: () => void;
    handleDetail: (item: HoaDon) => void;
    text: string;
}



const ListHoaDonComponent: React.FC<Props>  = ({
    data,
    handleGetAll,
    handleDetail,
    text
}) => {

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
    const renderItem = ({item}: {item: HoaDon}) => {
        const {formattedDate, formattedTime} = formatDate(item.thoiGianTao);
        return (
          <TouchableHighlight
            underlayColor="#F2F2F2" // Màu sắc khi chạm vào
            onPress={() => handleDetail(item)}>
            <View style={styles.item}>
              <View style={{paddingHorizontal: 5}}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                   <Text style={{ color: 'black', fontWeight: 'bold'}}>{item?.maHD}</Text> 
                  <Text>
                    {formattedDate || ''} - {formattedTime || ''}
                  </Text>
                </View>
                <Text style={{ color: 'black'}}>
                  Thành tiền:{' '}
                  {parseInt(item?.thanhTien || '').toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
               
                <Text style={{color: 'black',}}>
                  {/* {item.trangThaiMua === 1 ? "ok" : "Chưa mua"} */}
                  Trạng thái giao: {getStatusText(item?.trangThaiMua ?? 0)}
                </Text>
                <Text style={{color: 'black'}}>
                  Thanh toán:
                  {item?.trangThaiThanhToan === 0 ? (
                    <Text style={{color: 'red'}}> Chưa thanh toán</Text>
                  ) : (
                    <Text style={{color: 'green'}}> Đã thanh toán</Text>
                  )}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      };
  return (
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item._id || ''}
    scrollEnabled={true}
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
  )
}

const styles = StyleSheet.create({
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

export default ListHoaDonComponent