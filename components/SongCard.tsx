import {View, Text, Image, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import tw from 'twrnc';
import {PlayIcon} from 'react-native-heroicons/solid';
import TrackPlayer from 'react-native-track-player';

import type {SongType} from '../types';

const SongCard = ({song}: {song: SongType}) => {
  const parseDuration = useCallback((value: number) => {
    const parsedValue = (value / 60000).toFixed(2).toString().split('.');

    return `${parsedValue[0]}:${parsedValue[1]}`;
  }, []);

  const handlePlay = useCallback(async () => {
    await TrackPlayer.add(song);
    await TrackPlayer.play();
  }, [song]);
  return (
    <View style={tw`flex-row items-center justify-between px-2 mb-4`}>
      <View style={tw`flex-row items-center gap-x-5`}>
        <Image
          source={
            song.cover
              ? {
                  uri: song.cover,
                }
              : require('../assets/song-cover.jpg')
          }
          style={tw`w-16 h-16 rounded-xl`}
        />
        <View style={tw`gap-y-1`}>
          <Text style={tw`text-lg font-medium text-white`}>
            {song.title.substring(0, 20)}
          </Text>
          <View style={tw`gap-x-2 flex-row items-center`}>
            <Text style={tw`text-gray-300 text-xs`}>
              {song.artist !== '<unknown>' ? song.artist : 'Unknown'}
            </Text>
            <Text style={tw`text-gray-300 text-xs`}>/</Text>
            <Text style={tw`text-gray-300 text-xs`}>
              {parseDuration(song.duration)}
            </Text>
          </View>
        </View>
      </View>

      <Pressable style={tw`bg-green-600 rounded-full p-2`} onPress={handlePlay}>
        <PlayIcon color={'white'} size={24} />
      </Pressable>
    </View>
  );
};

export default SongCard;
