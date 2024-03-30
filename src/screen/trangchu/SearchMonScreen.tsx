import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavProps from '../../models/props/NavProps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import { appIcon } from '../../constants/appIcon';

const SearchMonScreen: React.FC<NavProps> = ({ navigation }) => {
  const route: any = useRoute();
  const [searchValue, setSearchValue] = useState("Tìm kiếm món ngon...");

  const searchMon = async (tenMon: string) => {
    console.log("Searching for:", tenMon);
    // Implement your search logic here
  };

  const goBackEvent = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const value = route.params?.searchValue || "";
    searchMon(value);
    setSearchValue(value);
  }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackEvent}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} size={appIcon.backArrowIcon} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm món ngon..."
            onChangeText={(text) => setSearchValue(text)}
            defaultValue={route.params?.searchValue}
          />
          <TouchableOpacity onPress={() => searchMon(searchValue)}>
            <FontAwesomeIcon icon={faSearch} style={styles.icon} size={appIcon.normal} />
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  backIcon: {
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    alignSelf: 'center', // Align input text vertically center
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  }
});

export default SearchMonScreen;

