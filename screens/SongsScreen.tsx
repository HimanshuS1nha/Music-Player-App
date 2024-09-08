import {View, Text, TextInput, ScrollView} from 'react-native';
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
