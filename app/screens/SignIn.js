import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
          Alert.alert('Erro', 'Preencha todos os campos.');
          return;
        }
    
        try {
          const response = await fetch('http://192.168.68.113:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log('🔐 Login bem-sucedido:', data);
            navigation.navigate('AppHome', { userId: data.userId, email: data.email });
          } else {
            Alert.alert('Erro', data.message || 'Erro ao fazer login.');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor.');
        }
      }; 
    

    return (
        <ImageBackground
        source={require('../assets/Login/LoginSignIn.png')}
        style={styles.background}
        resizeMode="cover"
        >
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            >
            <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                {/* Email */}
                <ImageBackground source={require('../assets/Login/inputEmail.png')} style={styles.inputBG}>
                    <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </ImageBackground>

                {/* Password */}
                <ImageBackground source={require('../assets/Login/inputPassword.png')} style={styles.inputBG}>
                    <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    />
                </ImageBackground>

                {/* Botão Entrar */}
                <View style={styles.loginButton}>
                    <TouchableOpacity onPress={handleLogin}>
                    <Image
                        source={require('../assets/Login/LoginBtn.png')}
                        style={styles.loginImage}
                    />
                    </TouchableOpacity>
                </View>

                {/* btn social midia */}
                    <View style={styles.socialButtonsWrapper}>
            
                        <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require('../assets/Login/Google.png')}
                            style={styles.socialImage}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
            
                        <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require('../assets/Login/FB.png')}
                            style={styles.socialImage}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>

                {/* Criar conta */}
                <TouchableOpacity onPress={() => navigation.navigate('AppHome')}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.registerText}>Don’t have an account? </Text>
                        <Text style={styles.registerLink}>Register</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </ImageBackground>
    );
};

export default SignIn;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: '25%',
    paddingBottom: 40,
  },
  container: {
    alignItems: 'center',
    gap: 20,
  },
  inputBG: {
    width: 327,
    height: 70,
    justifyContent: 'center',
    paddingLeft: 48,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  loginButton: {
    marginTop: 20,
  },
  loginImage: {
    width: 278,
    height: 63,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
  },
  socialBtn: {
    width: 60,
    height: 60,
  },
  link: {
    marginTop: 20,
    color: '#1F4C6B',
    textDecorationLine: 'underline',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
  },
  registerText: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#1F4C6B',
  },
  registerLink: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  socialButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  
  socialButton: {
    width: 150,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  socialImage: {
    width: '100%',
    height: '100%',
  },
});
