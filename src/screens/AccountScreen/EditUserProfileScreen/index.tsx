import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Avatar from '../../../component/Avater';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileInfoRow from '../../../component/ProfileInfoRow.tsx';
import { Icon } from 'native-base';
import { auth } from '../../../config/firebase';
import { updateProfile } from 'firebase/auth';

const UserProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345');
  const [zipcode, setZipcode] = useState('95054');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [age, setAge] = useState('33');
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
    }
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: name,
        });
        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', 'Error updating profile: ' + error.message);
      }
    }
  };

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
        <ProfileInfoRow label="Name" value={name} onChange={setName} />
        <ProfileInfoRow label="Email" value={email} onChange={setEmail} />
        <ProfileInfoRow
          label="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <ProfileInfoRow label="Zipcode" value={zipcode} onChange={setZipcode} />
        <ProfileInfoRow
          label="Phone Number (Optional)"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <ProfileInfoRow label="Age (Optional)" value={age} onChange={setAge} />
        <ProfileInfoRow
          label="Gender (Optional)"
          value={gender}
          onChange={setGender}
        />
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
