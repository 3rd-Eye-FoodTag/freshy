import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  ChevronRightIcon,
  ScrollView,
  FlatList,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { RootStackParams } from '../../router/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { currentUser, userSelector } from '../../redux/reducer';
import { fetchUserDataFromFirebase } from '../../utils/api';

const profileOptions = [
  { id: '1', icon: 'person', label: 'Edit User Profile' },
  { id: '2', icon: 'settings', label: 'Settings' },
  { id: '3', icon: 'home', label: 'Household Profile' },
  { id: '4', icon: 'email', label: 'Contact Us' },
  { id: '5', icon: 'subscriptions', label: 'Subscription' },
  { id: '6', icon: 'card-giftcard', label: 'Refer, Log And Earn' },
  { id: '7', icon: 'thumb-up', label: 'Like Us on App Store' },
];

type Props = NativeStackScreenProps<RootStackParams, 'WelcomeScreen'>;

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [avater, setAvater] = useState<string | null>(null);
  const [error, setError] = useState(null);

  const currentUserUUID = useSelector(currentUser);

  const { data: userData, isSuccess } = useQuery({
    queryKey: ['fetchUserInfo', currentUserUUID],
    queryFn: () => fetchUserDataFromFirebase(currentUserUUID),
  });


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      setError(e);
    }
  };

  if (error) {
    console.warn(error);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <Box style={styles.container}>
          <VStack space={4} alignItems="center" mt={8} style={{ zIndex: 1 }}>
            <Avatar size="2xl" source={require('../../assets/avater.png')} />
            <Text fontSize="lg" fontWeight="bold" color="coolGray.800">
              {isSuccess ? userData?.name : 'Loading...'}
            </Text>
          </VStack>
          <FlatList
            data={profileOptions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProfileOption
                icon={item.icon}
                label={item.label}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
            contentContainerStyle={{ marginTop: 24 }}
          />
          <Button
            mt={4}
            bg="#00A86B"
            _text={{ color: 'white' }}
            onPress={handleLogout}>
            Sign Out
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileOption: React.FC<{
  icon: string;
  label: string;
  navigation: Props['navigation'];
}> = ({ icon, label, navigation }) => (
  <TouchableOpacity
    onPress={() => {
      switch (label) {
        case 'Edit User Profile':
          navigation.navigate('EditUserProfileScreen');
          break;
        case 'Settings':
          navigation.navigate('SettingScreen');
          break;
        case 'Household Profile':
          navigation.navigate('HouseholdProfileScreen');
          break;
        case 'Contact Us':
          navigation.navigate('ContactUsScreen');
          break;
        case 'Subscription':
          navigation.navigate('SubscriptionScreen');
          break;
        case 'Refer, Log And Earn':
          navigation.navigate('ReferLogAndEarnScreen');
          break;
        default:
          break;
      }
    }}
    style={styles.option}>
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      px={4}
      py={3}>
      <HStack alignItems="center" space={3}>
        <Text fontSize="md" color="coolGray.800">
          {label}
        </Text>
      </HStack>
      <ChevronRightIcon
        size="5"
        mt="0.5"
        color="lightgrey"
        iconName="chevron-right"
      />
    </HStack>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  option: {
    width: '100%',
  },
});

export default AccountScreen;
