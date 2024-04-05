import React from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Mon} from '../models/Mon';
import {appColors} from '../constants/appColors';
import {appFontSize} from '../constants/appFontSizes';

interface Props {
  data: Mon[];
  textTitle?: string;
  textTag?: string;
  textSeeMore?: string;
  showIndicator?: boolean;
  styleFlatList?: StyleProp<ViewStyle>;
  stylesItem?: StyleProp<ViewStyle>;
  styleTag?: StyleProp<TextStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleSeeMore?: StyleProp<TextStyle>;
  onItemClick?: (item: Mon) => void; // New prop for item click event

}

const FlatListHomeComponent: React.FC<Props> = ({
  data,
  showIndicator = true,
  styleFlatList,
  stylesItem,
  textTitle,
  textTag,
  textSeeMore,
  styleTag,
  styleTitle,
  styleSeeMore,
  onItemClick
}) => {
  const renderItem = ({item}: {item: Mon}) => {
    const handleItemClick = () => {
      if (onItemClick) {
        onItemClick(item); // Call onItemClick prop with the clicked item
      }
    };
    return (
      <TouchableOpacity onPress={handleItemClick}>
        <View style={[stylesItem, styles.item]}>
          <Image
            source={
              !item?.hinhAnh || item?.hinhAnh === 'N/A'
                ? require('../assest/image/default-avatar.jpg')
                : {uri: item?.hinhAnh}
            }
            style={{
              width: 140,
              height: 135,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            resizeMode="cover"
            defaultSource={require('../assest/image/default-avatar.jpg')}
          />
          <View style={{paddingLeft: 5, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {item?.tenMon}
            </Text>
            <Text style={{color: 'black', padding: 1}}>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(item?.giaTien ?? 0)}
            </Text>

            <Text
              style={[
                styleTag,
                {borderWidth: 1, width: 75, paddingLeft: 4, marginTop: 2,borderRadius: 5},
              ]}>
              {textTag}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Mon, index: number) => {
    return item._id || index.toString(); // Sử dụng index.toString() nếu không có _id
  };

  return (
    <View>
      <View style={styles.viewTitle}>
        <Text
          style={[
            styleTitle,
            {fontSize: appFontSize.normal, fontWeight: '500', padding: 10},
          ]}>
          {textTitle}
        </Text>
        <Text
          style={[
            styleSeeMore,
            {color: appColors.primary, fontWeight: '400', padding: 10},
          ]}>
          {textSeeMore}
        </Text>
      </View>

      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Sử dụng hàm keyExtractor đã chỉnh sửa
        style={[styleFlatList, {height: 230, marginTop: 10}]}
        showsHorizontalScrollIndicator={showIndicator}
        // onScroll={() => { setScroll(true), setLastList(false) }}
        // onEndReached={() => { setLastList(true), setScroll(false) }}
        // onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: appColors.white,
    elevation: 4,
    paddingBottom: 20,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FlatListHomeComponent;
