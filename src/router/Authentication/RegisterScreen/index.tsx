import {useEffect, useState} from 'react';
// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {registerAccount} from '../../../utils/api';
import {register} from '../../../redux/reducer';
import {useDispatch} from 'react-redux';
import EmailInputScreen from './EmailInputScreen';
import PasswordInputScreen from './PasswordInputScreen';
import MoreInfoInputScreen from './MoreInfoInputScreen';

type AccountInfoProps = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const RegisterScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showTellUseMore, setShowTellUsMore] = useState(false);
  const [userInfo, setUserInfor] = useState({
    name: '',
    age: '',
    gender: '',
    zipcode: '',
  });

  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const registerHanlder = async ({email, password}: AccountInfoProps) => {
    dispatch(
      register({
        navigate: navigate,
        email,
        password,
        data: {name, age, gender, zipcode},
      }),
    );
  };

  // return <EmailInputScreen />

  // return <PasswordInputScreen />
  return <MoreInfoInputScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <EmailInputScreen />
      <PasswordInputScreen />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 100,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
