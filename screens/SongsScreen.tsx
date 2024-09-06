import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React, {useCallback} from 'react';
import tw from 'twrnc';
import {PlayIcon} from 'react-native-heroicons/solid';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import {useSongs} from '../hooks/useSongs';

const SongsScreen = () => {
  const {songs} = useSongs();

  const parseDuration = useCallback((value: number) => {
    const parsedValue = (value / 60000).toFixed(2).toString().split('.');

    return `${parsedValue[0]}:${parsedValue[1]}`;
  }, []);
  return (
    <Wrapper>
      <ScrollView>
        <Header title="Songs" />

        <View style={tw`px-5 mt-8`}>
          <TextInput
            style={tw`bg-gray-700 rounded-xl px-4 text-white`}
            placeholder="Search for songs..."
            placeholderTextColor={'#d1d5db'}
          />
        </View>

        <View style={tw`px-5 mt-8 gap-y-6`}>
          <Text style={tw`text-white text-lg font-semibold`}>
            Recently Played
          </Text>

          <ScrollView horizontal contentContainerStyle={tw`gap-x-4`}>
            <Pressable>
              <Image
                source={{
                  uri: 'https://i.scdn.co/image/ab67616d0000b27391b467ab179bd199b2fbc3d9',
                }}
                style={tw`w-40 h-40 rounded-lg`}
              />
            </Pressable>
            <Pressable>
              <Image
                source={{
                  uri: 'https://cdns-images.dzcdn.net/images/cover/5381a40a0df5172681c388876ea375c8/1900x1900-000000-80-0-0.jpg',
                }}
                style={tw`w-40 h-40 rounded-lg`}
              />
            </Pressable>
          </ScrollView>
        </View>

        <View style={tw`px-5 mt-8 gap-y-6`}>
          <Text style={tw`text-white text-lg font-semibold`}>
            List of songs
          </Text>

          <View style={tw`flex-row items-center justify-between px-2`}>
            <View style={tw`flex-row items-center gap-x-5`}>
              <Image
                source={{uri: songs[0].cover}}
                style={tw`w-16 h-16 rounded-xl`}
              />
              <View style={tw`gap-y-1`}>
                <Text style={tw`text-lg font-medium text-white`}>
                  {songs[0].title}
                </Text>
                <View style={tw`gap-x-2 flex-row items-center`}>
                  <Text style={tw`text-gray-300 text-xs`}>
                    {songs[0].artist}
                  </Text>
                  <Text style={tw`text-gray-300 text-xs`}>/</Text>
                  <Text style={tw`text-gray-300 text-xs`}>
                    {parseDuration(songs[0].duration)}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable style={tw`bg-green-600 rounded-full p-2`}>
              <PlayIcon color={'white'} size={24} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default SongsScreen;
