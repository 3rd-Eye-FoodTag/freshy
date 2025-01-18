/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import {currentUser, setCurrentUser} from './src/redux/reducer';
// import {onAuthStateChanged} from '@firebase/auth';
// import {auth} from './src/config/firebase';
import auth from '@react-native-firebase/auth';
import {GluestackUIProvider} from './src/components/ui/gluestack-ui-provider';

import Stack from './src/router/stack';
import ModalContainer from './src/components/Modal';
import './global.css';
import PushNotification from 'react-native-push-notification';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const queryClient = new QueryClient();

const Router = (): React.JSX.Element => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();
  const current = useSelector(currentUser);

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     const settings = await notifee.requestPermission();

  //     if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
  //       console.log('Permission settings', settings);
  //     } else {
  //       console.log('User declined permission');
  //     }
  //   };
  //   requestPermission();

  //   const subscribeToTopic = async () => {
  //     try {
  //       await messaging().subscribeToTopic('Topic');
  //       console.log('subscribed to topic: Topic');
  //     } catch (error) {
  //       console.error('sub', error);
  //     }
  //   };

  //   subscribeToTopic();

  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     console.log('Notification Foreground received', remoteMessage);
  //     try {
  //       await notifee.displayNotification({
  //         title: remoteMessage.notification?.title || 'New Notification',
  //         body: remoteMessage.notification?.body || 'Checkout this update',
  //       });
  //     } catch (error) {
  //       console.log('Push unsubscribe notification fail', error);
  //     }
  //   });

  //   return () => {
  //     unsubscribeOnMessage();
  //   };
  // }, []);

  const handleOnAuthStateChanged = user => {
    console.log('USER IS STILL LOGGsD IN: ', user);
    if (user) {
      setUser(user);
      dispatch(setCurrentUser(user.uid));
    } else {
      dispatch(setCurrentUser(''));
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleOnAuthStateChanged);
    console.log({subscriber});
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log({user});

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     // console.log('USER IS STILL LOGGsD IN: ', user);
  //     if (user) {
  //       setUser(user);
  //       dispatch(setCurrentUser(user.uid));
  //     } else {
  //       dispatch(setCurrentUser(''));
  //     }
  //   });
  // }, [user]);

  return <Stack />;
};

const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <GluestackUIProvider>
              <NativeBaseProvider>
                <ModalContainer>
                  <Router />
                </ModalContainer>
              </NativeBaseProvider>
            </GluestackUIProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
