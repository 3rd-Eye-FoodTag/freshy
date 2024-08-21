import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Box, Heading, VStack, FormControl, Input, Button, Link, IconButton, Icon, WarningOutlineIcon } from 'native-base';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; 
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 控制密码显示的状态
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      queryClient.invalidateQueries(); // Invalidate and refetch the auth query
    } catch (err) {
      setError(err.message);
      console.log(err.message);
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
              autoCapitalize="none"
              secureTextEntry={!showPassword} // 控制密码是否以星号显示
              InputRightElement={
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name={showPassword ? "visibility" : "visibility-off"}
                      size="sm"
                      color="coolGray.500"
                    />
                  }
                  onPress={() => setShowPassword(!showPassword)} // 切换显示/隐藏密码
                />
              }
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
