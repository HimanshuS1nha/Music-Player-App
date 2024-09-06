import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Cog8ToothIcon} from 'react-native-heroicons/solid';

const Header = ({title}: {title: string}) => {
  return (
    <View style={tw`flex-row px-5 justify-between items-center pt-2`}>
      <Text style={tw`text-white text-2xl font-semibold`}>{title}</Text>
      <Pressable>
        <Cog8ToothIcon color={'white'} size={24} />
      </Pressable>
    </View>
  );
};

export default Header;
