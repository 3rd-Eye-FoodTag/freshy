import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../../../screens/AccountScreen';
import EditUserProfileScreen from '../../../screens/AccountScreen/EditUserProfileScreen';
import SettingScreen from '../../../screens/AccountScreen/SettingScreen';
import HouseholdProfileScreen from '../../../screens/AccountScreen/HouseholdProfileScreen';

const AccountStack = createNativeStackNavigator();

const AccountStackNavigator: React.FC = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />

      <AccountStack.Screen
        name="EditUserProfileScreen"
        component={EditUserProfileScreen}
        options={{
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />

      <AccountStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerTitle: 'Settings',
          headerBackTitle: 'Back',
        }}
      />

      <AccountStack.Screen
        name="HouseholdProfileScreen"
        component={HouseholdProfileScreen}
        options={{
          headerTitle: 'Settings',
          headerBackTitle: 'Back',
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;
