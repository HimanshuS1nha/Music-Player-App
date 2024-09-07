import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

import Wrapper from '../components/Wrapper';
import {useSongs} from '../hooks/useSongs';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {getSongs} = useSongs();

  useEffect(() => {
    getSongs().then(res => {
      if (res) {
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
    <Wrapper>
      <Text style={tw`text-white`}>SplashScreen</Text>
    </Wrapper>
  );
};

export default SplashScreen;
