import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AccountStackNavigator from '../stack/AccountStackNavigator';

import Storage from '../../screens/StorageScreen';
import ShoppingScreen from '../../screens/ShoppingScreen';

import MealPlanScreen from '../../screens/MealPlanScreen';

import CustomTabBar from './CustomTabBar';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {currentUser} from '../../redux/reducer';

type RootTabParamList = {
  Home: undefined;
  Eats: undefined;
  Add: undefined;
  Shopping: undefined;
  Account: undefined;
};

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabLayout = (): React.JSX.Element => {
  const current = useSelector(currentUser);
  const navigation = useNavigation();
  useEffect(() => {
    if (!current) {
      navigation.navigate('WelcomeScreen');
    }
  }, [current]);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          ...styles.shadow,
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        headerShown: false,
        tabBarActiveTintColor: '#00B578',
      }}>
      <Tab.Screen name="Home" component={Storage} />
      <Tab.Screen name="Eats" component={MealPlanScreen} />
      <Tab.Screen name="Account" component={AccountStackNavigator} />
      <Tab.Screen
        name="Add"
        component={HomeScreen} // Change this to your desired screen
      />
      {/* <Tab.Screen name="Shopping" component={ShoppingScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#57d177',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // tabBarIconContainer: {
  //   marginBottom: -20,
  // },
});
