/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { store } from './src/redux/store'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";

import { currentUser, setCurrentUser } from './src/redux/reducer';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './src/config/firebase';

import TabLayout from './src/router/TabLayout';
import Stack from './src/router/stack';

const queryClient = new QueryClient();

const Router = (): React.JSX.Element =>{
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const current = useSelector(currentUser)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("USER IS STILL LOGGsD IN: " , user);
      if (user) {
        setUser(user);
        dispatch(setCurrentUser(user.uid))
      } else {
        dispatch(setCurrentUser(""))
      }
    });
  }, [user]);

  return current ? <TabLayout /> : <Stack /> 
} 

const App = (): React.JSX.Element =>{  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <NativeBaseProvider>
              <Router />
            </NativeBaseProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;