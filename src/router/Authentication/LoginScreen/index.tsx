import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Box, Heading, VStack, FormControl, Input, Button, Link, WarningOutlineIcon } from 'native-base';

import { loginStatus } from '../../../redux/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { handleAuthentication } from '../../../utils/api';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';
import { auth } from '../../../config/firebase';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      queryClient.invalidateQueries(); // Invalidate and refetch the auth query
    } catch (err) {
      setError(err.message);
      console.log(err.message)
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Box flex={1} px={4} py={8} bg="white" justifyContent="flex-start">
        <Heading size="lg" fontWeight="600" color="coolGray.800" textAlign="center" mb={6}>
          Welcome Back!
        </Heading>
        <VStack space={4}>
          <FormControl isInvalid={!!error}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              borderColor="coolGray.300"
              _focus={{
                borderColor: 'coolGray.500',
              }}
            />
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              borderColor="coolGray.300"
              _focus={{
                borderColor: 'coolGray.500',
              }}
            />
            {error ? (
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {error}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button mt={4} bg="#00A86B" _text={{ color: 'white' }} onPress={handleLogin}>
            Login
          </Button>
          <Link mt={4} textAlign="center" _text={{ color: '#1E90FF' }}>
            Forgot password?
          </Link>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoginScreen;

