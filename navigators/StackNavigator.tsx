import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import SongScreen from '../screens/SongScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Song" component={SongScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
