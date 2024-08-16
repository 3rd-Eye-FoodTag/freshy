import React, { useState } from 'react';
import { Box, Avatar, Text, VStack, HStack, Divider, Button, ChevronRightIcon, ScrollView, FlatList } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { RootStackParams } from '../../router/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';

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
  const [error, setError] = useState(null)
  const handleLogout = async () => {
    try{
      await signOut(auth)
    } catch (e: any) {
      setError(e)
    }
  };

  if(error) {
    console.warn(error)
  }

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <ScrollView>
        <Box style={styles.container}>
          <VStack space={4} alignItems="center" mt={8}>
              <Avatar
              size="2xl"
              source={require('../../assets/avater.png')}
              />
              <Text fontSize="lg" fontWeight="bold" color="coolGray.800">
              John Smith
              </Text>
          </VStack>

          <FlatList
              data={profileOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProfileOption icon={item.icon} label={item.label} />}
              ItemSeparatorComponent={() => <Divider />}
              contentContainerStyle={{ marginTop: 24 }}
          />
          <Button mt={4} bg="#00A86B" _text={{ color: 'white' }} onPress={handleLogout}>
            Sign Out
          </Button>
        </Box>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const ProfileOption: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <TouchableOpacity
    onPress={() => {
      // Handle navigation or action here
    }}
    style={styles.option}
  >
    <HStack alignItems="center" justifyContent="space-between" w="100%" px={4} py={3}>
      <HStack alignItems="center" space={3}>
        {/* <Icon as={MaterialIcons} name={icon} size="md" color="coolGray.600" /> */}
        <Text fontSize="md" color="coolGray.800">
          {label}
        </Text>
      </HStack>
      <ChevronRightIcon size="5" mt="0.5" color="lightgrey" iconName='chevron-right' />
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
