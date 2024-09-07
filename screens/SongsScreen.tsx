import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {FlashList} from '@shopify/flash-list';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import SongCard from '../components/SongCard';
import Player from '../components/Player';
import {useSongs} from '../hooks/useSongs';

const SongsScreen = () => {
  const {songs} = useSongs();
  return (
    <Wrapper>
      <ScrollView>
        <Header title="Songs" />

        <View style={tw`px-5 mt-8`}>
          <TextInput
            style={tw`bg-gray-800 rounded-xl px-4 text-white`}
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

        <View style={tw`px-5 mt-8 gap-y-6 min-h-40`}>
          <Text style={tw`text-white text-lg font-semibold`}>
            List of songs
          </Text>

          <FlashList
            data={songs}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item, index}) => {
              return <SongCard song={item} index={index} />;
            }}
            estimatedItemSize={100}
          />
        </View>
      </ScrollView>

      <Player />
    </Wrapper>
  );
};

export default SongsScreen;
