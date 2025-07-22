import React, { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    // 🔐 Ask permission for notifications
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      });

    // 📲 Get the device FCM token
    messaging()
      .getToken()
      .then(token => {
        console.log('🔥 FCM Token:', token);
      });

    // 🔔 Listen to messages in foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        '📩 New Message',
        `${remoteMessage.notification?.title || 'No Title'}\n\n${
          remoteMessage.notification?.body || 'No Message'
        }`,
      );
    });

    // 📦 Handle messages in background/quit state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📥 Background Message:', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🚀 FCM Integrated!</Text>
    </View>
  );
};

export default App;
