import {View, Text, Image, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import tw from 'twrnc';
import TrackPlayer, {
  useActiveTrack,
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  ArrowsRightLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from 'react-native-heroicons/solid';
import Slider from '@react-native-community/slider';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import type {SongType} from '../types';
import {useSongs} from '../hooks/useSongs';

const SongScreen = () => {
  const {songs} = useSongs();
  const activeTrack = useActiveTrack() as SongType;
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [isMuted, setIsMuted] = useState(false);

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

  const handleSeekTo = useCallback(async (value: number) => {
    await TrackPlayer.seekTo(value);
  }, []);

  const handlePlayRandomSong = useCallback(async () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    console.log(randomIndex);
    await TrackPlayer.skip(randomIndex);
    await TrackPlayer.play();
  }, []);

  const handleMute = useCallback(async () => {
    if (isMuted) {
      await TrackPlayer.setVolume(1);
    } else {
      await TrackPlayer.setVolume(0);
    }

    setIsMuted(prev => !prev);
  }, [isMuted]);

  const parseDuration = useCallback((value: number) => {
    return `${Math.floor(value / 60)}:${
      Math.ceil(value % 60).toString().length === 1
        ? '0' + Math.ceil(value % 60).toString()
        : Math.ceil(value % 60)
    }`;
  }, []);

  useEffect(() => {
    TrackPlayer.getVolume().then(volume => {
      if (volume === 0) {
        setIsMuted(true);
      }
    });
  }, []);
  return (
    <Wrapper>
      <Header showBackButton showFavouritesButton />

      <View style={tw`mt-9 gap-y-6 items-center`}>
        <Image
          source={
            activeTrack?.cover
              ? {uri: activeTrack?.cover}
              : require('../assets/song-cover.jpg')
          }
          style={tw`w-[80%] h-[65%] rounded-xl`}
          resizeMode="stretch"
        />

        <View style={tw`gap-y-2 items-center`}>
          <Text style={tw`text-2xl font-medium text-white`}>
            {activeTrack?.title.substring(0, 20)}
          </Text>
          <Text style={tw`text-gray-300 text-xs`}>
            {activeTrack?.artist !== '<unknown>'
              ? activeTrack?.artist
              : 'Unknown'}
          </Text>
        </View>

        <View style={tw`w-full px-4 flex-row gap-x-2 items-center`}>
          <Text style={tw`text-white text-xs font-medium`}>
            {parseDuration(progress.position)}
          </Text>
          <Slider
            style={tw`w-[83%] h-3`}
            minimumTrackTintColor="#059669"
            maximumTrackTintColor="#d1d5db"
            value={progress.position}
            maximumValue={progress?.duration}
            minimumValue={0}
            onValueChange={handleSeekTo}
          />
          <Text style={tw`text-white text-xs font-medium`}>
            {parseDuration(progress.duration)}
          </Text>
        </View>

        <View style={tw`flex-row items-center justify-around w-full px-6`}>
          <Pressable onPress={handlePlayRandomSong}>
            <ArrowsRightLeftIcon color={'white'} size={24} />
          </Pressable>
          <Pressable onPress={handleSkipToPrevious}>
            <BackwardIcon color={'white'} size={24} />
          </Pressable>
          {playbackState.state === State.Playing ? (
            <Pressable onPress={handlePause}>
              <PauseIcon color={'white'} size={50} />
            </Pressable>
          ) : (
            <Pressable onPress={handlePlay}>
              <PlayIcon color={'white'} size={50} />
            </Pressable>
          )}
          <Pressable onPress={hanleSkipToNext}>
            <ForwardIcon color={'white'} size={30} />
          </Pressable>
          <Pressable onPress={handleMute}>
            {isMuted ? (
              <SpeakerXMarkIcon color={'white'} size={24} />
            ) : (
              <SpeakerWaveIcon color={'white'} size={24} />
            )}
          </Pressable>
        </View>
      </View>
    </Wrapper>
  );
};

export default SongScreen;
