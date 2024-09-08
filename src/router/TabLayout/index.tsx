import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import {Button} from 'native-base';

import AccountStackNavigator from '../stack/AccountStackNavigator';

import Storage from '../../screens/StorageScreen';
import ShoppingScreen from '../../screens/ShoppingScreen';

import MealPlanScreen from '../../screens/MealPlanScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CenterMenu from '../../component/CenterMenu';
import CustomTabBar from './CustomTabBar';

type RootTabParamList = {
  Home: undefined;
  Storage: undefined;
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

const PlusMiniusComponent: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.customButtonContainer} onPress={onPress}>
      <View style={styles.customButton}>{children}</View>
    </TouchableOpacity>
  );
};

const TabLayout = (): React.JSX.Element => {
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
      <Tab.Screen
        name="Home"
        component={Storage}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Storage"
        component={MealPlanScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="fridge-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen} // Change this to your desired screen
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-minus-variant"
              size={32}
              color="white"
            />
          ),
          tabBarButton: props => (
            <PlusMiniusComponent {...props}>
              <MaterialCommunityIcons
                name="plus-minus-variant"
                size={32}
                color="white"
              />
            </PlusMiniusComponent>
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="basket-shopping" size={20} color={color} />
          ),
          headerRight: () => <Button> + </Button>,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
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
