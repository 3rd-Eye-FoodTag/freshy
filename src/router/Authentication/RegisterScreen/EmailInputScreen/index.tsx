import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  WarningOutlineIcon,
} from 'native-base';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../constants';
import {useDispatch} from 'react-redux';
import {registerEmail} from '../../../../redux/reducer';

import {StyleSheet, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'EmailInputScreen'>;

const EmailInputScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (email === '') {
      setError('Email cannot be empty');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
    } else {
      setError('');
      dispatch(registerEmail(email));
      navigation.push('PasswordInputScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} px={4} py={8} bg="white">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          textAlign="center"
          mb={6}>
          Enter your email address
        </Heading>
        <VStack space={4}>
          <FormControl isInvalid={!!error}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              borderColor="coolGray.300"
              _focus={{
                borderColor: 'coolGray.500',
              }}
            />
            {error ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {error}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button
            mt={4}
            bg="#00A86B"
            _text={{color: 'white'}}
            onPress={handleContinue}>
            Continue
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
});

export default EmailInputScreen;
