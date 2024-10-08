import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MusicalNoteIcon, StarIcon} from 'react-native-heroicons/solid';

import SongsScreen from '../screens/SongsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderColor: '#6b7280',
        },
      }}>
      <Tabs.Screen
        name="Songs"
        component={SongsScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <MusicalNoteIcon color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <StarIcon color={color} size={size} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
