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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
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
import {isWithin10Minutes, scheduleFunction} from '@/utils/utils';
import {getUserDataFromFirebase, postNotification} from '@/utils/routes';

const queryClient = new QueryClient();

const Router = (): React.JSX.Element => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();
  const currentUserUUID = useSelector(currentUser);

  const {data: userData = []} = useQuery<any>({
    queryKey: ['fetchUserInfo', currentUserUUID],
    queryFn: () => getUserDataFromFirebase(currentUserUUID),
  });

  useEffect(() => {
    const requestPermission = async () => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings', settings);
      } else {
        console.log('User declined permission');
      }
    };
    requestPermission();

    const subscribeToTopic = async () => {
      try {
        await messaging().subscribeToTopic('ExpiredFood');
        console.log('subscribed to topic: ExpiredFood');
      } catch (error) {
        console.error('sub', error);
      }
    };

    subscribeToTopic();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Notification Foreground received', remoteMessage);
      try {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'New Notification',
          body: remoteMessage.notification?.body || 'Checkout this update',
        });
      } catch (error) {
        console.log('Push unsubscribe notification fail', error);
      }
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  useEffect(() => {
    // if (userData && userData?.setting && currentUserUUID) {
    //   postNotification({
    //     title: 'There are few food near to expired',
    //     body: 'Banna, Apple',
    //     topic: 'ExpiredFood',
    //     userId: currentUserUUID,
    //   });
    // }

    if (userData && userData?.setting && currentUserUUID) {
      console.warn('ready to shoot a notification');
      const weeklyWraptime = userData?.setting.weeklyWrapTime;
      scheduleFunction(weeklyWraptime.Days, weeklyWraptime.Times, () => {
        postNotification({
          title: 'There are few food near to expired',
          body: 'Banna, Apple',
          topic: 'ExpiredFood',
          userUid: currentUserUUID,
        });
      });
    }
  }, [userData, currentUserUUID]);

  useEffect(() => {
    auth().onAuthStateChanged(loginUser => {
      console.log('USER IS STILL LOGGED IN: ', loginUser);
      if (loginUser) {
        setUser(loginUser);
        dispatch(setCurrentUser(loginUser.uid));
      } else {
        dispatch(setCurrentUser(''));
      }
    });
  }, [dispatch]);

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
