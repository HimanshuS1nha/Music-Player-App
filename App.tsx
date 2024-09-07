import {
  Text,
  PermissionsAndroid,
  Pressable,
  Alert,
  BackHandler,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import tw from 'twrnc';
import TrackPlayer from 'react-native-track-player';

import StackNavigator from './navigators/StackNavigator';
import Wrapper from './components/Wrapper';

const App = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setupTrackPlayer = useCallback(async () => {
    await TrackPlayer.setupPlayer();
  }, []);

  const checkPermission = useCallback(async () => {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (permissionStatus) {
      await setupTrackPlayer();
      setIsPermissionGranted(true);
    }

    setIsLoading(false);
  }, []);

  const getPermission = useCallback(async () => {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (permissionStatus) {
      await setupTrackPlayer();
      setIsPermissionGranted(true);
    } else {
      const requestPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );

      if (requestPermissionStatus === 'granted') {
        setIsPermissionGranted(true);
      } else {
        Alert.alert('Error', 'This app needs media permission to work', [
          {
            text: 'Cancel',
            onPress: BackHandler.exitApp,
          },
          {
            text: 'Give Permission',
            onPress: Linking.openSettings,
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  if (isLoading) {
    return (
      <Wrapper style={tw`items-center justify-center`}>
        <ActivityIndicator color={'blue'} size={45} />
      </Wrapper>
    );
  }

  if (!isLoading && !isPermissionGranted) {
    return (
      <Wrapper style={tw`items-center justify-center gap-y-6`}>
        <Text style={tw`text-rose-600 text-base font-medium`}>
          This app needs media permission to work
        </Text>

        <Pressable
          onPress={getPermission}
          style={tw`bg-blue-600 p-4 rounded-xl`}>
          <Text style={tw`text-white text-base font-medium`}>
            Grant Permission
          </Text>
        </Pressable>
      </Wrapper>
    );
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
