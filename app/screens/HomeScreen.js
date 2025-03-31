import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mockProperties from '../data/mockProperties'; // Ajuste o caminho conforme necessário
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navegar automaticamente para MatchNotification com os dados mockados
    navigation.navigate('MatchNotification', { mockProperties: mockProperties });
  }, [navigation]);  // Aqui você está passando o mockProperties correto para a tela MatchNotification

  return (
    <ImageBackground
      source={require('../assets/Onboarding/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/Onboarding/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProductTour1')}
            >
              <Image
                source={require('../assets/Onboarding/start.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Move tudo para baixo
    alignItems: 'center',
    paddingBottom: 10, // Espaço do botão em relação ao final da tela
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  logo: {
    width: '80%',
    aspectRatio: 3,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonImage: {
    width: 190,
    height: 54,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40, 
  },
  buttonContainer: {
    paddingBottom: 10,
  },
});

export default HomeScreen;
