import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';

const SettingsScreen = () => {
  return (
    <Wrapper>
      <Header showBackButton />

      <Text style={tw`pt-7 text-white text-2xl font-medium text-center`}>
        Settings
      </Text>

      <View style={tw`pt-7`}>
        <View style={tw`pb-4 flex-row justify-between items-center px-5`}>
          <Text style={tw`text-base text-white`}>Remove all favourties</Text>
          <Pressable style={tw`bg-rose-600 px-4 py-2 rounded-lg`}>
            <Text style={tw`text-white`}>Remove</Text>
          </Pressable>
        </View>
      </View>

      <View style={tw`px-5 pt-4`}>
        <Text style={tw`text-white text-lg font-medium`}>Music</Text>
        <Text style={tw`text-white text-xs`}>Version 1.0.0</Text>
      </View>
    </Wrapper>
  );
};

export default SettingsScreen;
