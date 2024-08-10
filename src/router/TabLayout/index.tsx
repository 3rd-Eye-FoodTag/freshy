import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Button, Icon, MoonIcon } from 'native-base';
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Storage from '../../screens/StorageScreen'
import ShoppingScreen from '../../screens/ShoppingScreen'
import AccountScreen from '../../screens/AccountScreen';
import MealPlanScreen from '../../screens/MealPlanScreen';
import HomeIcon from '@mui/icons-material/Home';
// import Ionicons from '@expo/vector-icons/Ionicons';

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

const PlusMiniusComponent: React.FC<BottomTabBarButtonProps>  = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={onPress}
    >
      <View style={styles.customButton}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const TabLayout = (): React.JSX.Element =>  {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
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
        }}
      >
        <Tab.Screen
          name="Home"
          component={Storage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MoonIcon />
            ),
          }}
        />
        <Tab.Screen
          name="Storage"
          component={MealPlanScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="server" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={HomeScreen} // Change this to your desired screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" color="#fff" size={30} />
            ),
            tabBarButton: (props) => (
              <PlusMiniusComponent {...props}>
                <Icon name="plus" color="#fff" size={30} />
              </PlusMiniusComponent>
            ),
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={ShoppingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-outline" color={color} size={size} />
            ),
            headerRight: () => (
              <Button> + </Button>
            )
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default TabLayout

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
