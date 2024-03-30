import React, { useState }  from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import NavProps from '../../models/props/NavProps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appIcon } from '../../constants/appIcon';

const TrangChuScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [searchValue, setSearchValue] = useState('');

  //Di chuyển qua màn hình tìm kiếm
  const openSearchScreen = () => {
    navigation.navigate('SearchMonScreen', { searchValue });
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm món ngon..."
          onChangeText={setSearchValue}
        />
        <TouchableOpacity onPress={openSearchScreen}>
          <FontAwesomeIcon icon={faSearch} style={styles.icon} size={appIcon.normal}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row', 
    margin: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  icon: {
    marginLeft: 10, 
    alignSelf: 'center',
  }
});

export default TrangChuScreen;