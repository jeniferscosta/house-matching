import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import App from '../App';
import HomeScreen from '../screens/HomeScreen';
import ProductTour1 from './ProductTour1';
import ProductTour2 from './ProductTour2';
import ProductTour3 from './ProductTour3';
import LoginStep1 from './LoginStep1';
import LoginStep2 from './LoginStep2';
import OTPVerification from './OTPVerification';
import LocationStep from '../screens/LocationStep';
import PreferableProperties from '../screens/PreferableProperties';
import PropertySelection from '../screens/PropertySelection';
import StartRegistration from '../screens/StartRegistration';
import AppHome from '../screens/AppHome';
import SingIn from '../screens/SignIn';
import Notification from '../screens/Notification';
import PropertyDetails from '../screens/PropertyDetails';
import MatchNotification from '../screens/MatchNotification';

const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductTour1" component={ProductTour1} />
        <Stack.Screen name="ProductTour2" component={ProductTour2} />
        <Stack.Screen name="ProductTour3" component={ProductTour3} />
        <Stack.Screen name="LoginStep1" component={LoginStep1} />
        <Stack.Screen name="LoginStep2" component={LoginStep2} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="LocationStep" component={LocationStep} />
        <Stack.Screen name="PreferableProperties" component={PreferableProperties} />
        <Stack.Screen name="PropertySelection" component={PropertySelection} />
        <Stack.Screen name="StartRegistration" component={StartRegistration} />
        <Stack.Screen name="AppHome" component={AppHome} />
        <Stack.Screen name="SignIn" component={SingIn} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
        <Stack.Screen name="MatchNotification" component={MatchNotification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;