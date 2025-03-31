import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import mockProperties from '../data/mockProperties'; // Adjust the path as necessary

const MatchNotification = () => {
  const navigation = useNavigation();

  // notification request permissions
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão para notificações não concedida');
      } else {
        console.log('Permissão para notificações concedida');
      }
    }
    requestPermissions();
  }, []);

  // Send notification
  const sendNotification = async (property) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Property near to you!',
        body: `You are closer to "${property.name}". Click here for more details.`,
      },
      trigger: null,
    });
  };

  useEffect(() => {
    const randomProperty = mockProperties[0];  // Usando a primeira propriedade como exemplo
    if (randomProperty) {
      sendNotification(randomProperty); // Envia a notificação quando a propriedade é encontrada
    }
  }, []);  // Este efeito é disparado quando o componente é montado

  const randomProperty = mockProperties[0];

  return (
    <ImageBackground
      source={require('../assets/Match/MatchNotification.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Você está perto de uma propriedade!</Text>
        <Image source={{ uri: matchedProperty.image }} style={styles.image} />
        <Text style={styles.propertyName}>{matchedProperty.name}</Text>
        <Text style={styles.propertyDescription}>
          Localização: {matchedProperty.location}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PropertyDetails', { property: matchedProperty })}
        >
          <Image
            source={require('../assets/Match/bookVisit.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MatchNotification;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 15,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  propertyDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    // Ajuste o estilo do botão conforme necessário
  },
  buttonImage: {
    width: 200, // Tamanho do botão conforme necessário
    height: 50,  // Tamanho do botão conforme necessário
  },
});
