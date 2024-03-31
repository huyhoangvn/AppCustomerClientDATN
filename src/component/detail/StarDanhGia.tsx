import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';

const StarRating = ({ rating } : any) => {
  const stars = [];
  const maxRating = 5; // Maximum rating

  // Add filled stars based on rating
  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color={appColors.yellow} style={styles.starIcon} />);
    } else {
      // Add empty star for remaining stars
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color={appColors.gray} style={styles.starIcon} />);
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const StarDanhGia = ({ trungBinhDanhGia } : any) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.text}>{trungBinhDanhGia}</Text>
      <StarRating rating={trungBinhDanhGia} />
    </View>
  );
};

StarDanhGia.defaultProps = {
  trungBinhDanhGia: 0,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2, // Adjust spacing between stars if needed
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: appFontSize.normal,
    color: appColors.text,
    marginRight: 5, // Adjust spacing between text and stars if needed
  },
});

export default StarDanhGia;

