import {View, Text} from 'react-native';
import React from 'react';

import Wrapper from '../components/Wrapper';
import {useSongs} from '../hooks/useSongs';
import Header from '../components/Header';

const SongsScreen = () => {
  const {songs} = useSongs();
  return (
    <Wrapper>
      <Header title="Songs" />
      <Text>SongsScreen</Text>
    </Wrapper>
  );
};

export default SongsScreen;
