import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const LoginStep2 = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasSQLInjectionRisk = /('|--|;|--|\/\*|\*\/)/.test(password);
    return password.length >= minLength && !hasSQLInjectionRisk;
  };

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Digite um e-mail válido.');
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres e ser segura.');
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres e ser segura.');
      return;
    } else {
      setPasswordError('');
    }

    console.log('📡 Enviando para:', 'http://192.168.68.113:3000/api/users/register');

    try {
      const response = await fetch('http://192.168.68.113:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Usuário registrado com sucesso:', data);
        navigation.navigate('LocationStep', { userId: data.userId, email });
      } else {
        if (data.message === 'E-mail já registrado.') {
          setEmailError('Este e-mail já está em uso.');
          Alert.alert('Erro', 'Este e-mail já está em uso.');
        } else {
          Alert.alert('Erro', data.message || 'Erro ao registrar.');
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro de rede', 'Não foi possível se conectar ao servidor.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Login/FormEmpty.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              <ImageBackground
                source={require('../assets/Login/inputFullName.png')}
                style={styles.inputBG}
              >
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#888"
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                />
              </ImageBackground>

              <ImageBackground
                source={require('../assets/Login/inputEmail.png')}
                style={styles.inputBG}
              >
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError && validateEmail(text)) setEmailError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </ImageBackground>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <ImageBackground
                source={require('../assets/Login/inputPassword.png')}
                style={styles.inputBG}
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError && validatePassword(text)) setPasswordError('');
                  }}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
              </ImageBackground>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              <View style={styles.termsAndPasswordRow}>
                <View style={styles.termsRow}>
                  <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                    <Text style={styles.linkText}>Terms & Services</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.togglePasswordText}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.submitWrapper}>
                <TouchableOpacity onPress={handleRegister}>
                  <Image
                    source={require('../assets/Login/RegisterBtn.png')}
                    style={styles.submitImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '25%',
    paddingBottom: 40,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
  inputBG: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: 327,
    height: 70,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    paddingLeft: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingLeft: 40,
    alignSelf: 'flex-start',
    fontFamily: 'Lato-Regular',
  },
  termsRow: {
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  linkText: {
    color: '#1F4C6B',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    textDecorationLine: 'underline',
  },
  togglePasswordText: {
    fontSize: 12,
    color: '#1F4C6B',
    fontFamily: 'Lato-Bold',
    textDecorationLine: 'underline',
    paddingRight: 10,
  },
  termsAndPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    width: '85%',
  },
  submitWrapper: {
    marginTop: 60,
    alignItems: 'center',
  },
  submitImage: {
    width: 278,
    height: 63,
  },
});

export default LoginStep2;
