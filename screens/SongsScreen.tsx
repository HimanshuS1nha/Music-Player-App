import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import SongCard from '../components/SongCard';
import Player from '../components/Player';
import {useSongs} from '../hooks/useSongs';

const SongsScreen = () => {
  const {songs} = useSongs();
  const navigation = useNavigation();
  return (
    <Wrapper>
      <ScrollView>
        <Header title="Songs" />

        <Pressable
          style={tw`px-5 mt-8`}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Search');
          }}>
          <TextInput
            style={tw`bg-gray-800 rounded-xl px-4 text-white`}
            placeholder="Search for songs..."
            placeholderTextColor={'#d1d5db'}
            readOnly
          />
        </Pressable>

        <View style={tw`px-5 mt-8 gap-y-6 min-h-40`}>
          <Text style={tw`text-white text-lg font-semibold`}>
            List of songs
          </Text>

          {songs.length === 0 && (
            <Text style={tw`text-rose-500 text-center text-base font-medium`}>
              Nothing here.
            </Text>
          )}

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
