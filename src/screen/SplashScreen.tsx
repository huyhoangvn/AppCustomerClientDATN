import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg'; // Import SVG components from react-native-svg
import NavProps from '../models/props/NavProps';
import { appColors } from '../constants/appColors';
import { SplashScreenBg, LogoNoText } from "../assest/svgs/index";

const SplashScreen: React.FC<NavProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }, 3000);

    // Clear timeout on unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Svg style={styles.bg}>
        <SplashScreenBg width="100%" height="100%"  preserveAspectRatio="xMidYMid slice"/>
      </Svg>
      {loading && (
        <View style={styles.loadingContainer}>
          <LogoNoText/>
          <Text style={styles.logoText}>Food Center</Text>
          <ActivityIndicator
            size="large"
            color={appColors.primary}
            style={styles.activityIndicator}
          />
          {/* <Text style={styles.loadingText}>Loading...</Text> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: "white"
  },
  bg: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: appColors.primary
  }
});

export default SplashScreen;

