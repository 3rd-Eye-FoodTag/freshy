import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Avatar from '../../../component/Avater';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileInfoRow from '../../../component/ProfileInfoRow.tsx';
import { Icon } from 'native-base';
import { auth } from '../../../config/firebase';
import { updateProfile } from 'firebase/auth';

const UserProfile: React.FC = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '12345',
    zipcode: '95054',
    phoneNumber: '123-456-7890',
    age: '33',
    gender: 'Male',
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setState((prevState) => ({
        ...prevState,
        name: currentUser.displayName || '',
        email: currentUser.email || '',
      }));
    }
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: state.name,
        });
        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', 'Error updating profile: ' + error.message);
      }
    }

    // 测试用fetchUserList
    // if (currentUser) {
    //   try {
    //     // 从 Firebase 获取用户信息
    //     const userInfoResponse = await fetchUserList({ uid: currentUser.uid });
    //     console.log('Full Response:', userInfoResponse);

    //     const userInfo = userInfoResponse.data;

    //     if (userInfo) {
    //       // 打印完整的用户信息
    //       console.log('Fetched User Info:', userInfo);

    //       // 根据获取到的信息设置状态
    //       setName(userInfo.name || '');
    //       setAge(userInfo.age || '');
    //       setEmail(currentUser.email || '');
    //     } else {
    //       console.log('No user info found');
    //     }
    //   } catch (error) {
    //     console.log('Error fetching user info:', error);
    //   }
    // }

  };


  const profileFields = [
    { label: 'Name', value: state.name, key: 'name', secureTextEntry: false },
    { label: 'Email', value: state.email, key: 'email', secureTextEntry: false },
    { label: 'Password', value: state.password, key: 'password', secureTextEntry: true },
    { label: 'Zipcode', value: state.zipcode, key: 'zipcode', secureTextEntry: false },
    { label: 'Phone Number (Optional)', value: state.phoneNumber, key: 'phoneNumber', secureTextEntry: false },
    { label: 'Age (Optional)', value: state.age, key: 'age', secureTextEntry: false },
    { label: 'Gender (Optional)', value: state.gender, key: 'gender', secureTextEntry: false },
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
        {profileFields.map((field) => (
          <ProfileInfoRow
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(newValue) =>
              setState((prevState) => ({
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
