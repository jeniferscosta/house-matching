import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useState } from 'react';



const AppHome = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, email } = route.params || {};
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log('📌 AppHome:');
    console.log('userId:', userId);
    console.log('email:', email);
  }, [userId, email]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('📍 Localização atual:', currentLocation);
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/AppHome/AppHome.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Ícone de Notificações */}
        <View style={styles.notificationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification', { userId, email })}>
            <Image
              source={require('../assets/AppHome/notification.png')}
              style={styles.notificationIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* O restante da tela pode ser simulado com o background */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppHome;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  notificationContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  notificationIcon: {
    width: 32,
    height: 32,
  },
});
