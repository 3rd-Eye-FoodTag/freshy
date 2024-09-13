import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../../../screens/AccountScreen';
import EditUserProfileScreen from '../../../screens/AccountScreen/EditUserProfileScreen';
import SettingScreen from '../../../screens/AccountScreen/SettingScreen';
import HouseholdProfileScreen from '../../../screens/AccountScreen/HouseholdProfileScreen';
import ContactUsScreen from '../../../screens/AccountScreen/ContactUsScreen';
import SubscriptionScreen from '../../../screens/AccountScreen/SubscriptionScreen';
import ReferLogAndEarnScreen from '../../../screens/AccountScreen/ReferLogAndEarnScreen';
import DisplayPreferencesScreen from '../../../screens/AccountScreen/SettingScreen/DisplayPreferencesScreen.tsx';
import FoodProfileScreen from '../../../screens/AccountScreen/SettingScreen/FoodProfileScreen';
import LanguageScreen from '../../../screens/AccountScreen/SettingScreen/LanguageScreen';
import WeeklyWrapUpTimeScreen from '../../../screens/AccountScreen/SettingScreen/WeeklyWrapUpTimeScreen.tsx';
import PushNotificationsScreen from '../../../screens/AccountScreen/SettingScreen/PushNotificationsScreen';

const AccountStack = createNativeStackNavigator();

const AccountStackNavigator: React.FC = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
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
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{
          headerTitle: 'Contact Us',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          headerTitle: 'Subscription',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="ReferLogAndEarnScreen"
        component={ReferLogAndEarnScreen}
        options={{
          headerTitle: 'Refer, Log And Earn',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="DisplayPreferencesScreen"
        component={DisplayPreferencesScreen}
        options={{
          headerTitle: 'Display Preferences',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="FoodProfileScreen"
        component={FoodProfileScreen}
        options={{
          headerTitle: 'Food Profile',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{
          headerTitle: 'Language',
          headerBackTitle: 'Back',
        }}
      />

      <AccountStack.Screen
        name="WeeklyWrapUpTimeScreen"
        component={WeeklyWrapUpTimeScreen}
        options={{
          headerTitle: 'Weekly Wrap Up Time',
          headerBackTitle: 'Back',
        }}
      />
      <AccountStack.Screen
        name="PushNotificationsScreen"
        component={PushNotificationsScreen}
        options={{
          headerTitle: 'Push Notifications',
          headerBackTitle: 'Back',
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;
