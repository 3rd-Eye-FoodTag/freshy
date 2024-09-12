import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import Avatar from '../../../component/Avater';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileInfoRow from '../../../component/ProfileInfoRow.tsx';
import {Icon} from 'native-base';

const UserProfile: React.FC = () => {
  const [name, setName] = useState('John Smith');
  const [email, setEmail] = useState('johnsmith@gmail.com');
  const [password, setPassword] = useState('12345');
  const [zipcode, setZipcode] = useState('95054');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [age, setAge] = useState('33');
  const [gender, setGender] = useState('Male');

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {},
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
