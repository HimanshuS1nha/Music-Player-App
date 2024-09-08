import {Image, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

import Wrapper from '../components/Wrapper';
import {useSongs} from '../hooks/useSongs';
import {useFavourties} from '../hooks/useFavourites';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {getSongs} = useSongs();
  const {getFavourites} = useFavourties();

  useEffect(() => {
    getSongs().then(res => {
      if (res) {
        getFavourites();
        TrackPlayer.add(res).then(() => {
          TrackPlayer.setRepeatMode(RepeatMode.Queue).then(() => {
            // @ts-ignore
            navigation.replace('Tabs');
          });
        });
      }
    });
  }, []);
  return (
    <Wrapper style={tw`items-center justify-center gap-y-7`}>
      <Image
        source={require('../assets/song-cover.jpg')}
        style={tw`w-36 h-36 rounded-full`}
      />
      <Text style={tw`text-white text-2xl font-semibold`}>Music App</Text>
      <ActivityIndicator size={45} color={'blue'} />
    </Wrapper>
  );
};

export default SplashScreen;
