import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPVerification = ({ route, navigation }) => {
  const { email, userId  } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const handleChange = (value, index) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Mover para o próximo campo automaticamente
    if (value && index < 3) {
      const nextInput = `input${index + 1}`;
      refs[nextInput]?.focus();
    }
  };

  const refs = {};

  const handleVerify = async () => { // Ensure this function is async
    const code = otp.join('');
    if (code.length < 4) {
      setError('Por favor, insira os 4 dígitos');
      return;
    }

    try {
      const response = await fetch('http://192.168.68.113:3000/api/users/verify-otp', { // await is valid here
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        navigation.navigate('PreferableProperties', { userId: data.userId });
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Erro ao verificar código.');
    }
  };

  return (
    <ImageBackground source={require('../assets/Login/FormOTPenterCode.png')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.otpWrapper}>
          {otp.map((digit, index) => (
            <ImageBackground
              key={index}
              source={require('../assets/Login/inputOtp.png')}
              style={styles.otpInputWrapper}
            >
              <TextInput
                ref={(ref) => (refs[`input${index}`] = ref)}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                style={styles.otpInput}
              />
            </ImageBackground>
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {message ? <Text style={styles.successText}>{message}</Text> : null}

        <TouchableOpacity onPress={handleVerify}>
          <Image source={require('../assets/Login/RegisterBtn.png')} style={styles.submitImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendWrapper} onPress={() => {/* função para reenviar OTP */}}>
          <Text style={styles.resendText}>Didn’t receive the OTP? Resend OTP <Text style={styles.resendLink}>Reenviar</Text></Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: '35%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginBottom: 20,
    color: '#1F4C6B',
  },
  otpWrapper: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 180,
    marginBottom: 30,
  },
  otpInputWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginBottom: 12,
  },
  successText: {
    color: 'green',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginBottom: 12,
  },
  submitImage: {
    width: 278,
    height: 63,
    marginTop: 200,
  },
  resendWrapper: {
    marginTop: 16,
    marginTop: 24,
  },
  resendText: {
    fontSize: 12,
    color: '#1F4C6B',
    fontFamily: 'Lato-Regular',
  },
  resendLink: {
    fontFamily: 'Lato-Bold',
    textDecorationLine: 'underline',
  },
});

export default OTPVerification;
