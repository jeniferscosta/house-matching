import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const StartRegistration = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, email } = route.params;
  const [phoneError, setPhoneError] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/; // aceita apenas números de 10 a 15 dígitos
    return phoneRegex.test(phone);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
  }
  
};

console.log('📥 Dados recebidos via route:', route.params);

const handleNext = async () => {
  console.log('Número digitado:', phone);

  // 🟡 Validação ANTES de montar o formData
  if (!validatePhone(phone)) {
    setPhoneError('Digite um telefone válido (somente números).');
    Alert.alert('Erro', 'Digite um número de telefone válido.');
    return;
  } else {
    setPhoneError('');
  }

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('phone', phone);

  if (profileImage) {
    formData.append('profileImage', {
      uri: profileImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
  }

  try {
    const response = await fetch('http://192.168.68.113:3000/api/users/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert('Erro', data.message || 'Erro ao salvar os dados.');
      return;
    }

    console.log('✅ Perfil atualizado com sucesso:', data);
    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('AppHome', { userId, email }) },
    ]);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    Alert.alert('Erro', 'Falha ao salvar os dados.');
  }
};

  return (
    <ImageBackground
      source={require('../assets/Account/UserEmpty.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Foto de perfil */}
        <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../assets/Account/profile-placeholder.png')}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>

        </View>


        {/* Campo Telefone */}
        <ImageBackground
          source={require('../assets/Account/TelephoneEmpty.png')}
          style={styles.inputBackground}
          resizeMode="contain"
        >
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={15}
            value={phone}
            onChangeText={setPhone}
          />

        </ImageBackground>
          
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        {/* Campo Email preenchido */}
        <ImageBackground
          source={require('../assets/Account/TextDisabled.png')}
          style={styles.inputBackground}
          resizeMode="contain"
        >
          <TextInput
            value={email}
            editable={false}
            style={styles.emailInput}
            placeholderTextColor="#fff"
          />
        </ImageBackground>

        {/* Botão Finish */}
        <View style={styles.finishContainer}>
          <TouchableOpacity onPress={handleNext}>
            <Image
              source={require('../assets/Account/Finish.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartRegistration;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    marginTop: 60,
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  inputBackground: {
    width: 327,
    height: 70,
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingLeft: 48,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  emailInput: {
    fontSize: 14,
    color: '#fff',
  },
  finishContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  buttonImage: {
    width: 278,
    height: 63,
  },
});
