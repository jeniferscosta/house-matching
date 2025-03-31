import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const LoginStep1 = () => {
  const navigation = useNavigation();
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Login/LoginSocialMedia.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* btn email */}
          <View style={styles.btnEmailContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
              <Image
                source={require('../assets/Login/contWithEmail.png')}
                style={styles.buttonImage}
                resizeMode="contain"
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

          {/* no account created */}
        
          <TouchableOpacity
            style={styles.registerWrapper}
            onPress={() => {
              console.log("Botão Register clicado");
              navigation.navigate('LoginStep2');
            }}
            >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.registerText}>Don’t have an account? </Text>
              <Text style={styles.registerLink}>Register</Text>
            </View>
          </TouchableOpacity>
        
        </SafeAreaView>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end', // empurra tudo pro fim
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  btnEmailContainer: {
    alignItems: 'center',
    marginBottom: 2,
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
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 250,
    height: 60,
  },
  registerWrapper: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 4,
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
});


export default LoginStep1;
