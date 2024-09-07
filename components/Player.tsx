import {View, Text, Image, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import tw from 'twrnc';
import TrackPlayer, {
  State,
  useActiveTrack,
  usePlaybackState,
} from 'react-native-track-player';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from 'react-native-heroicons/solid';

import type {SongType} from '../types';

const Player = () => {
  const activeTrack = useActiveTrack() as SongType;
  const playbackState = usePlaybackState();

  const parseDuration = useCallback((value: number) => {
    const parsedValue = (value / 60000).toFixed(2).toString().split('.');

    return `${parsedValue[0]}:${parsedValue[1]}`;
  }, []);

  const handlePlay = useCallback(async () => {
    await TrackPlayer.play();
  }, []);

  const handlePause = useCallback(async () => {
    await TrackPlayer.pause();
  }, []);

  const handleSkipToPrevious = useCallback(async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  }, []);

  const hanleSkipToNext = useCallback(async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  }, []);

  if (!activeTrack) {
    return null;
  }
  return (
    <View
      style={tw`bg-gray-800 p-4 mx-4 rounded-xl flex-row justify-between items-center mb-2`}>
      <View style={tw`flex-row gap-x-3 items-center`}>
        <Image
          source={
            activeTrack.cover
              ? {uri: activeTrack.cover}
              : require('../assets/song-cover.jpg')
          }
          style={tw`w-12 h-12 rounded-xl`}
        />
        <View style={tw`gap-y-1`}>
          <Text style={tw`text-base font-medium text-white`}>
            {activeTrack.title?.substring(0, 20)}
          </Text>
          <View style={tw`gap-x-2 flex-row items-center`}>
            <Text style={tw`text-gray-300 text-xs`}>
              {activeTrack.artist !== '<unknown>'
                ? activeTrack.artist
                : 'Unknown'}
            </Text>
            <Text style={tw`text-gray-300 text-xs`}>/</Text>
            <Text style={tw`text-gray-300 text-xs`}>
              {parseDuration(activeTrack.duration)}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`flex-row gap-x-3 items-center`}>
        <Pressable onPress={handleSkipToPrevious}>
          <BackwardIcon color={'white'} size={22} />
        </Pressable>
        {playbackState.state === State.Playing ? (
          <Pressable onPress={handlePause}>
            <PauseIcon color={'white'} size={22} />
          </Pressable>
        ) : (
          <Pressable onPress={handlePlay}>
            <PlayIcon color={'white'} size={22} />
          </Pressable>
        )}
        <Pressable onPress={hanleSkipToNext}>
          <ForwardIcon color={'white'} size={22} />
        </Pressable>
      </View>
    </View>
  );
};

export default Player;
