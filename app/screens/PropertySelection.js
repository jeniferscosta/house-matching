import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const properties = [
  { id: 'house', img: require('../assets/Properties/category2.png'), selectedImg: require('../assets/Properties/category2_selected.png') },
  { id: 'apartment', img: require('../assets/Properties/category6.png'), selectedImg: require('../assets/Properties/category6_selected.png') },
];

const PropertySelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, email } = route.params;
  console.log('📦 userId received in PreferableProperties:', userId);
  console.log('email received in PreferableProperties:', userId);

  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveProperties = async () => { 
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please try again.');
      return;
    }

    if (!selected.length) {
      Alert.alert('Warning', 'Select at least one property type.');
      return;
    }

    try {
      const response = await fetch('http://192.168.68.113:3000/api/properties/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          properties: selected,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error when saving a property');
      }

      console.log('✅ Property saved!');
      navigation.navigate('StartRegistration', { userId, email });
    } catch (error) {
      console.error('Error when saving a property:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Properties/PreferableGrid.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StartRegistration', { userId, email })}>
            <Image source={require('../assets/ProductTour/skipHeaderGrey.png')} style={styles.skip} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent} // Use contentContainerStyle for inner content
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {properties.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => toggleSelection(item.id)} style={styles.gridItem}>
                <Image
                  source={selected.includes(item.id) ? item.selectedImg : item.img}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.nextContainer}>
            <TouchableOpacity onPress={handleSaveProperties}>
              <Image
                source={require('../assets/ProductTour/nextBtnGreen.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PropertySelection;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  skip: {
    width: 80,
    height: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 204,
  },
  gridItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#1F4C6B',
    fontWeight: '600',
  },
  nextContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  buttonImage: {
    width: 200,
    height: 60,
  },
});
