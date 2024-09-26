import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Avatar from '../../../component/Avater';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileInfoRow from '../../../component/ProfileInfoRow.tsx';
import { Icon } from 'native-base';
import { auth } from '../../../config/firebase';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchUserDataFromFirebase, updateUserInfoFromFirebase } from '../../../utils/api';
import { currentUser } from '../../../redux/reducer';

const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    zipCode: '',
    phoneNumber: '',
    age: '',
    gender: '',
  });

  const currentUserUUID = useSelector(currentUser);

  const { data: userData, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['fetchUserInfo', currentUserUUID],
    queryFn: () => fetchUserDataFromFirebase(currentUserUUID),
  });

  useEffect(() => {
    if (isSuccess && userData) {
      setUserInfo({
        name: userData.name || '',
        email: userData.email || '',
        password: '123456',
        zipCode: userData.zipCode || '',
        phoneNumber: userData.phoneNumber || '',
        age: userData.age || '',
        gender: userData.gender || '',
      });
    }
  }, [isSuccess, userData]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Error fetching user data from Firebase.');
    }
  }, [isError]);

  const handleSave = async () => {
    const currentUid = auth.currentUser?.uid;
    if (currentUid) {
      try {
        await updateUserInfoFromFirebase(currentUid, {
          name: userInfo.name,
          email: userInfo.email,
          zipCode: userInfo.zipCode,
          phoneNumber: userInfo.phoneNumber,
          age: userInfo.age,
          gender: userInfo.gender,
        });
        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', 'Error updating profile: ' + error.message);
      }
    }
  };

  const profileFields = [
    { label: 'Name', value: userInfo.name, key: 'name', secureTextEntry: false },
    { label: 'Email', value: userInfo.email, key: 'email', secureTextEntry: false },
    { label: 'Password', value: userInfo.password, key: 'password', secureTextEntry: true },
    { label: 'Zipcode', value: userInfo.zipCode, key: 'zipCode', secureTextEntry: false },
    { label: 'Phone Number (Optional)', value: userInfo.phoneNumber, key: 'phoneNumber', secureTextEntry: false },
    { label: 'Age (Optional)', value: userInfo.age, key: 'age', secureTextEntry: false },
    { label: 'Gender (Optional)', value: userInfo.gender, key: 'gender', secureTextEntry: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.saveButtonContainer} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Avatar source={require('../../../assets/avater.png')} />
          <TouchableOpacity style={styles.editButton}>
            <Icon as={FontAwesome5} name={'pencil-alt'} size="sm" color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 0.5, backgroundColor: 'lightgray', marginBottom: 15 }} />
        {profileFields.map((field) => (
          <ProfileInfoRow
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(newValue) =>
              setUserInfo((prevState) => ({
                ...prevState,
                [field.key]: newValue,
              }))
            }
            secureTextEntry={field.secureTextEntry}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  saveButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  saveText: {
    color: '#00B578',
    fontSize: 17,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  editButton: {
    position: 'absolute',
    right: 145,
    bottom: 0,
    backgroundColor: '#00B578',
    padding: 10,
    borderRadius: 20,
  },
});

export default UserProfile;
