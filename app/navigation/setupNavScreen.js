import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Import HomeScreen
import ProductTour1 from '../screens/ProductTour1'; // Import ProductTour1
import ProductTour2 from '../screens/ProductTour2'; // Import ProductTour2
import ProductTour3 from '../screens/ProductTour3'; // Import ProductTour3
import LoginStep1 from '../screens/LoginStep1'; // Import LoginStep1
import LoginStep2 from '../screens/LoginStep2'; // Import LoginStep2
import OTPVerification from '../screens/OTPVerification'; // Import OTPVerification
import LocationStep from '../screens/LocationStep'; // Import LocationStep
import PreferableProperties from '../screens/PreferableProperties'; // Import PreferableProperties
import PropertySelection from '../screens/PropertySelection'; // Import PropertySelection
import StartRegistration from '../screens/StartRegistration';
import AppHome from '../screens/AppHome';
import Notification from '../screens/Notification';
import SignIn from '../screens/SignIn';
import PropertyDetails from '../screens/PropertyDetails'; // Import PropertyDetails
import MatchNotification from '../screens/MatchNotification'; // Import MatchNotification

const Stack = createStackNavigator();

const SetupNavScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
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
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="AppHome" component={AppHome} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
      <Stack.Screen name="MatchNotification" component={MatchNotification} />
    </Stack.Navigator>
  );
};

export default SetupNavScreen;