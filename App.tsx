/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type {PropsWithChildren} from 'react';
import { StyleSheet } from 'react-native';

import { NativeBaseProvider } from "native-base";

import { store } from './src/redux/store'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabLayout from './src/router/TabLayout';

import { currentUser, setCurrentUser } from './src/redux/reducer';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './src/config/firebase'
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './src/config/firebase';


import Stack from './src/router/stack';

const queryClient = new QueryClient();

const Router = (): React.JSX.Element =>{
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const current = useSelector(currentUser)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("USER IS STILL LOGGsD IN: " , user);
      if (user) {
        setUser(user);
        dispatch(setCurrentUser(user.uid))
      } else {
        dispatch(setCurrentUser(""))
      }
    });
  }, [user]);

  console.log({ current })
  
  // useEffect(() => {
  //   console.log("hello")
  //   setLoading(true)
  //   const usersQuery = collection(db, "FoodWiki")
  //   onSnapshot(usersQuery, (snapshot) => {
  //     let usersList = []
  //     snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }))
  //     setPeople(usersList)
  //     setLoading(false)
  //   })
  // }, [])

  // console.log({ people })

  return current ? <TabLayout /> : <Stack /> 
} 

const App = (): React.JSX.Element =>{  

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider>
            <Router />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
