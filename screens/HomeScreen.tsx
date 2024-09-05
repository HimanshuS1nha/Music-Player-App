import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSongs} from '../hooks/useSongs';

const HomeScreen = () => {
  const {getSongs} = useSongs();

  useEffect(() => {
    getSongs().then(res => {
      if (res) {
        console.log('Yeah');
      } else {
        console.log('No');
      }
    });
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
