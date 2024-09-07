import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';

const SettingsScreen = () => {
  return (
    <Wrapper>
      <Header showBackButton />
      <Text>SettingsScreen</Text>
    </Wrapper>
  );
};

export default SettingsScreen;
