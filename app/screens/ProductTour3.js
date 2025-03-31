import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ProductTour3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/ProductTour/ProdTour3.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.skipContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginsStep1')}>
              <Image
                source={require('../assets/ProductTour/skipHeaderGrey.png')}
                style={styles.skip}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.nextContainer}>
            <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('LoginStep1')}>
              <Image
                source={require('../assets/ProductTour/nextBtnGreen.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  skipContainer: {
    alignItems: 'flex-end',
    marginTop: -50,
    paddingHorizontal: 16,
  },
  nextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 190,
    height: 100,

  },
  skip: {
    width: 80,
    height: 30,
  },
});

export default ProductTour3;
