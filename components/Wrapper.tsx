import {View, StatusBar, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Wrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <>
      <View style={[tw`flex-1 bg-black`, style]}>{children}</View>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
    </>
  );
};

export default Wrapper;
