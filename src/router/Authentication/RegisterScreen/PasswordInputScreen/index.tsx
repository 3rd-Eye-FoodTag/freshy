import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Icon, WarningOutlineIcon } from 'native-base';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams } from '../../../../../App'

type Props = NativeStackScreenProps<RootStackParams, 'PasswordInputScreen'>;

const PasswordInputScreen: React.FC<Props> = ({ navigation })=> {

    //change to global value
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleValidation = () => {
    if (password === '' || confirmPassword === '') {
        setError('Passwords cannot be empty');
      } else if (password !== confirmPassword) {
        setError("Passwords don't match");
      } else {
        setError('');
        navigation.push("MoreInfoInputScreen")
        // Navigate to the next step
    }
  }

  const handleContinue = () => {
    navigation.push("MoreInfoInputScreen")
  };

  return (
    <Box flex={1} px={4} py={8} bg="white">
      <Heading size="lg" fontWeight="600" color="coolGray.800" textAlign="center" mb={6}>
        Choose your password
      </Heading>
      <VStack space={4}>
        <FormControl isInvalid={!!error}>
          <FormControl.Label>Create Password</FormControl.Label>
          <Input
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Icon
                // as={showPassword ? 'eye' : 'eye-off'}
                size="sm"
                mr="2"
                color="muted.400"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            borderColor="coolGray.300"
            _focus={{
              borderColor: 'coolGray.500',
            }}
          />
        </FormControl>
        <FormControl isInvalid={!!error}>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            type={showPassword ? 'text' : 'password'}
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
        <Button mt={4} bg="#00A86B" _text={{ color: 'white' }} onPress={handleContinue}>
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default PasswordInputScreen;
