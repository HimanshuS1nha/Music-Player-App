import {
  View,
  Text,
  PermissionsAndroid,
  Pressable,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import tw from 'twrnc';
import TrackPlayer from 'react-native-track-player';

import StackNavigator from './navigators/StackNavigator';

const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  const setupTrackPlayer = useCallback(async () => {
    await TrackPlayer.setupPlayer();
  }, []);

  const checkPermission = useCallback(async () => {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (permissionStatus) {
      await setupTrackPlayer();
      setIsMounted(true);
    }
  }, []);

  const getPermission = useCallback(async () => {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (permissionStatus) {
      await setupTrackPlayer();
      setIsMounted(true);
    } else {
      const requestPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );

      if (requestPermissionStatus === 'granted') {
        setIsMounted(true);
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

  if (!isMounted) {
    return (
      <View style={tw`flex-1 items-center justify-center gap-y-6`}>
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
      </View>
    );
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
