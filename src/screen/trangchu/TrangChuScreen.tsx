import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appIcon } from '../../constants/appIcon';
import NavProps from '../../models/props/NavProps';
import SearchHeader from './../../component/search/searchHeader';

const TrangChuScreen: React.FC<NavProps> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');

  //Di chuyển qua màn hình tìm kiếm
  const openScreen = (screen: string) => {
    navigation.navigate(screen, { searchValue });
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchAction={() => openScreen("SearchMonScreen")}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
});

export default TrangChuScreen;
