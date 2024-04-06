import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { appColors } from '../../constants/appColors';
import SearchHeader from './../../component/search/searchHeader'; // Import the SearchHeader component
import NavProps from '../../models/props/NavProps';
import { Mon } from '../../models/Mon';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import FloatButtonComponent from '../../component/FloatButtonComponent';
import authenticationAPI from '../../apis/authApi';
import LoadingComponent from '../../component/LoadingComponent';

const SearchMonScreen: React.FC<NavProps> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [listHienThi, setListHienThi] = useState<Mon[]>([]);
  const [textXemThem, setTextXemThem] = useState('Xem thêm');
  const [loading, setLoading] = useState(false);

  const [tenMon, setTenMon] = useState("");
  const [trang, setTrang] = useState(1);
  // Tìm kiếm món
  const searchMon = async (tenMon: string) => {
    await handleSearch(tenMon, 1)
  };

  const xemThemMon = async () => {
    await handleSearch(tenMon, trang + 1);
  };

  const goBackEvent = () => {
    navigation.goBack();
  };

  const handleChangeText = (text: string) => {
    searchMon(text)
    setSearchValue(text)
  }

  const handleDetail = ( item: any ) => {
    navigation.navigate('DetailMonScreen', {
      idMon: item._id,
      showMoreContent: true,
      uniqueId: Math.random() 
    });
  };


  const handleSearch = async (tenMon: string, trang: any) => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/mon?tenMon=${tenMon}&trang=${trang}`,
        'get',
      );

      if (res.success === false) {
        if (!res.list) {
          return;
        }
        return;
      }

      if (trang === 1) {
        setListHienThi([...res.list]);
      } else {
        setListHienThi(prevListHienThi => [...prevListHienThi, ...res.list]);
      }
      if (res.list.length > 0) {
        setTrang(trang);
        setTextXemThem(res.list.length === 10 ? 'Xem Thêm' : 'Hết');
      } else {
        setTextXemThem('Hết');
      }
      setTenMon(tenMon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    handleSearch(tenMon, 1);    
  }, []); 
  


      const renderItem = ({ item }: { item: Mon }) => {  
        return (
          <TouchableOpacity onPress={() => handleDetail(item)}>
          <View style={styles.item}>
              <Image
                source={
                (!item.hinhAnh || item.hinhAnh === "N/A") ?
                  require('../../assest/image/default-avatar.jpg') :
                  { uri: item.hinhAnh }}
                style={{ width: appImageSize.size75.width, height: appImageSize.size75.height }}
                defaultSource={require('../../assest/image/default-avatar.jpg')}
              />  
              <View style={{paddingHorizontal: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: appFontSize.titleList, color: 'black'}}>{item.tenMon}</Text>
              <Text style={{fontSize: appFontSize.normal}}>Loại món: {item.tenLM}</Text>
              <Text style={{fontSize: appFontSize.normal}}>Gía tiền: {item.giaTien}đ</Text>
              {/* <Text style={[{fontSize: appFontSize.normal}, {color: item.trangThai ? appColors.green : appColors.red}]}>
                {item.trangThai ? 'Hoạt động' : 'Khóa'}
              </Text>     */}
            </View>
          </View>
        </TouchableOpacity>
        );
      };

      
  return (
    <View style={styles.container}>
      <View style = {styles.header}>
      <SearchHeader 
        goBackEvent={goBackEvent}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchAction={()=> searchMon(searchValue)}
        searchOnTextChange={true}
        handleChangeText={(text: string)=>handleChangeText(text)}
      />
      </View>

      <View style={styles.main}>
      {listHienThi.length === 0 ? (
          <Text style={{textAlign: 'center', fontSize: appFontSize.normal}}>
            không tìm thấy món
          </Text>
        ) : (
        <FlatList
          data={listHienThi}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <TouchableOpacity onPress={xemThemMon}>
                <Text style={{fontSize: appFontSize.normal}}>{textXemThem}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
        </View>
        <LoadingComponent visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  header: {
    flex: 1,
  },
  main: {
    flex: 10,
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default SearchMonScreen;
