import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MusicalNoteIcon} from 'react-native-heroicons/solid';

import SongsScreen from '../screens/SongsScreen';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="Songs"
        component={SongsScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <MusicalNoteIcon color={color} size={size} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
