import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <View style={tw`flex-1 bg-black`}>{children}</View>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
    </>
  );
};

export default Wrapper;
