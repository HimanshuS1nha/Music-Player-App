import {View, Text, Image, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import tw from 'twrnc';
import {
  PlayIcon,
  PauseIcon,
  HeartIcon as FilledHeartIcon,
} from 'react-native-heroicons/solid';
import {HeartIcon as EmptyHeartIcon} from 'react-native-heroicons/outline';
import TrackPlayer, {
  usePlaybackState,
  State,
  useActiveTrack,
} from 'react-native-track-player';
import MarqueeView from 'react-native-marquee-view';

import type {SongType} from '../types';
import {useFavourties} from '../hooks/useFavourites';

const SongCard = ({song, index}: {song: SongType; index: number}) => {
  const {favourites, setFavourites} = useFavourties();
  const activeTrack = useActiveTrack();
  const playbackState = usePlaybackState();

  const addToFavourites = useCallback(async () => {
    const newFavourites = [...favourites, {...song}];

    await setFavourites(newFavourites);
  }, [song, favourites]);

  const removeFromFavourites = useCallback(async () => {
    const newFavourites = favourites.filter(
      favourite => favourite.url !== song.url,
    );

    await setFavourites(newFavourites);
  }, [activeTrack, favourites]);

  const parseDuration = useCallback((value: number) => {
    const seconds = value / 1000;

    return `${Math.floor(seconds / 60)}:${
      Math.ceil(seconds % 60).toString().length === 1
        ? '0' + Math.ceil(seconds % 60).toString()
        : Math.ceil(seconds % 60)
    }`;
  }, []);

  const handlePlay = useCallback(async () => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack === index) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
  }, [index]);

  const handlePause = useCallback(async () => {
    await TrackPlayer.pause();
  }, []);
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
          <MarqueeView style={tw`w-40`}>
            <Text style={tw`text-lg font-medium text-white`}>{song.title}</Text>
          </MarqueeView>
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

      <View style={tw`flex-row gap-x-4 items-center`}>
        <>
          {favourites.map(favourite => favourite.url).includes(song.url) ? (
            <Pressable onPress={removeFromFavourites}>
              <FilledHeartIcon color={'white'} size={22} fill={'red'} />
            </Pressable>
          ) : (
            <Pressable onPress={addToFavourites}>
              <EmptyHeartIcon color={'white'} size={22} />
            </Pressable>
          )}
        </>
        <Pressable
          style={tw`bg-green-600 rounded-full p-2`}
          onPress={
            playbackState.state === State.Playing &&
            song.url === activeTrack?.url
              ? handlePause
              : handlePlay
          }>
          {playbackState.state === State.Playing &&
          song.url === activeTrack?.url ? (
            <PauseIcon color={'white'} size={24} />
          ) : (
            <PlayIcon color={'white'} size={24} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default SongCard;
