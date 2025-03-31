import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const PropertyDetails = () => {
  const route = useRoute();
  const { property } = route.params;

  return (
    <ImageBackground
          source={require('../assets/Properties/PropertyDetails.png')} resizeMode="cover" style={styles.background}></ImageBackground>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
