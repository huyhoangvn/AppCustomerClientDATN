import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { appColors } from '../../constants/appColors';
import SearchHeader from './../../component/search/searchHeader'; // Import the SearchHeader component
import NavProps from '../../models/props/NavProps';

const SearchMonScreen: React.FC<NavProps> = ({ navigation }) => {
  const route: any = useRoute();
  const [searchValue, setSearchValue] = useState("Tìm kiếm món ngon...");

  // Tìm kiếm món
  const searchMon = async (tenMon: string) => {
    console.log("Searching for:", tenMon);
    // Implement your search logic here
  };

  // Di chuyển qua màn hình chi tiết món
  const openSearchScreen = (idMon: string) => {
    navigation.navigate('DetailMonScreen', {
      idMon: idMon,
      showMoreContent: true,
      uniqueId: Math.random() 
    });
  };

  // Đi về trang trước
  const goBackEvent = () => {
    navigation.goBack();
  };

  const handleChangeText = (text: string) => {
    searchMon(text)
    setSearchValue(text)
  }

  useEffect(() => {
    const value = route.params?.searchValue || "";// Lấy thông tin tìm kiếm từ bên trang chủ
    searchMon(value);
    setSearchValue(value);
  }, []);

  return (
    <View style={styles.container}>
      <SearchHeader 
        goBackEvent={goBackEvent}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchAction={()=> searchMon(searchValue)}
        searchOnTextChange={true}
        handleChangeText={(text: string)=>handleChangeText(text)}
      />
      <TouchableOpacity onPress={() => openSearchScreen("idMon")}>
        <Text style={{ color: appColors.red }}>Chi tiết món</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
});

export default SearchMonScreen;
