import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { geocodeAddress } from '../utils/geocodeAddress.js';
import MapView, { Marker } from 'react-native-maps';

const LocationStep = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, email } = route.params;

  const [manualAddress, setManualAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -23.561684,
    longitude: -46.625378,
  });
  const [formattedAddress, setFormattedAddress] = useState('');
  const mapRef = useRef(null);

  // 🔁 Função de reverse geocoding
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        setFormattedAddress(address);
      } else {
        setFormattedAddress('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro no reverse geocoding:', error);
      setFormattedAddress('Erro ao buscar o endereço.');
    }
  };

  // ✅ Salvar localização (manual ou selecionada)
  const handleSaveLocation = async () => {
    let finalLocation = selectedLocation;

    if (manualAddress.trim()) {
      try {
        const fullAddress = `${manualAddress}, Porto Alegre, RS`;
        console.log('➡️ Localização via endereço manual:', fullAddress);
        const geoData = await geocodeAddress(fullAddress);

        finalLocation = {
          latitude: geoData.latitude,
          longitude: geoData.longitude,
        };
        setFormattedAddress(geoData.formattedAddress);
      } catch (error) {
        Alert.alert('Erro', 'Endereço inválido ou não encontrado.');
        return;
      }
    } else {
      console.log('📍 Localização via marcador:', selectedLocation);
    }

    try {
      const response = await fetch('http://192.168.68.113:3000/api/location/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, locationInfo: finalLocation }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao salvar a localização');

      console.log('✅ Localização salva com sucesso!');
      navigation.navigate('PreferableProperties', { userId, email });
    } catch (error) {
      console.error('Erro ao salvar localização:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Location/LocationEmpty.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Skip */}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PreferableProperties', { userId, email })}>
            <Image
              source={require('../assets/ProductTour/skipHeaderGrey.png')}
              style={styles.skip}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* Mapa */}
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onRegionChangeComplete={(region) => {
                if (!manualAddress.trim()) {
                  const { latitude, longitude } = region;
                  setSelectedLocation({ latitude, longitude });
                  reverseGeocode(latitude, longitude); // chama reverse
                }
              }}
            />
            {!manualAddress.trim() && (
              <Image
                source={require('../assets/Location/markerIcon.png')}
                style={styles.centerMarker}
              />
            )}
          </View>

          {/* Campo manual */}
          <Text style={styles.label}>Search location manually:</Text>
          <TextInput
            style={styles.input}
            value={manualAddress}
            onChangeText={(text) => setManualAddress(text)}
            placeholder="Ex: Av. Ipiranga , 6681 - Partenon"
            placeholderTextColor="#999"
          />

          {/* Endereço formatado */}
          {formattedAddress ? (
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>📍 Endereço selecionado:</Text>
              <Text style={styles.addressText}>{formattedAddress}</Text>
            </View>
          ) : null}

          {/* Botão Next */}
          <View style={styles.nextContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
              <Image
                source={require('../assets/ProductTour/nextBtnGreen.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LocationStep;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  safeArea: {
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 34,
    height: 51,
    transform: [{ translateX: -15 }, { translateY: -30 }],
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#1F4C6B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  addressContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F4C6B',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#1F4C6B',
    fontWeight: '500',
    textAlign: 'center',
  },
  nextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 200,
    height: 60,
  },
});