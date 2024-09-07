import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

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
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
