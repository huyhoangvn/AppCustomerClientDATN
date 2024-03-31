import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { appIcon } from '../../constants/appIcon';
import { appColors } from '../../constants/appColors';

const SearchHeader = ({ goBackEvent = null, setSearchValue, searchValue, searchAction, searchOnTextChange = false, handleChangeText = null } : any) => {
  const handleTextChange = (text : string) => {
    if (handleChangeText) {
      handleChangeText(text);
    } else {
      setSearchValue(text);
    }
  };

  return (
    <View style={styles.header}>
      {goBackEvent && (
        <TouchableOpacity onPress={goBackEvent}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} size={appIcon.backArrowIcon} />
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm món ngon..."
          onChangeText={handleTextChange}
          value={searchValue}
        />
        <TouchableOpacity onPress={searchAction}>
          <FontAwesomeIcon icon={faSearch} style={styles.icon} size={appIcon.normal} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchHeader;


