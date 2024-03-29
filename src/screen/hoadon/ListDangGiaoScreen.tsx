import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';

const ListDangGiaoScreen: React.FC<NavProps> = ({ navigation }) =>  {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chờ duyệt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ListDangGiaoScreen;