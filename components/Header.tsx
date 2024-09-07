import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Cog8ToothIcon, ChevronLeftIcon} from 'react-native-heroicons/solid';
import {HeartIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title,
  showBackButton = false,
}: {
  title?: string;
  showBackButton?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row px-5 justify-between items-center pt-2`}>
      {showBackButton ? (
        <Pressable onPress={navigation.goBack}>
          <ChevronLeftIcon color={'white'} size={24} />
        </Pressable>
      ) : (
        <Text style={tw`text-white text-2xl font-semibold`}>{title}</Text>
      )}
      {showBackButton ? (
        <Pressable>
          <HeartIcon color={'white'} size={24} />
        </Pressable>
      ) : (
        <Pressable>
          <Cog8ToothIcon color={'white'} size={24} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
