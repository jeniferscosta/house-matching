import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreferableProperties = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, email } = route.params;
  console.log('📦 userId recebido em PreferableProperties:', userId);
  console.log('email recebido em PreferableProperties:', userId);

  return (
    <ImageBackground
      source={require('../assets/Properties/HouseTypes.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Botão Skip no topo */}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StartRegistration',{ userId, email })}>
            <Image
              source={require('../assets/ProductTour/skipHeaderGrey.png')}
              style={styles.skip}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Botão Show More na base */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PropertySelection',{ userId, email })}>
            <Image
              source={require('../assets/Properties/ShowMore.png')}
              style={styles.showMore}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PreferableProperties;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  skip: {
    width: 80,
    height: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  showMore: {
    width: 278,
    height: 100,
  },
});
