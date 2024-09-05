import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SongsScreen from '../screens/SongsScreen';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Songs" component={SongsScreen} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
