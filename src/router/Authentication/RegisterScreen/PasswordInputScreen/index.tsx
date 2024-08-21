import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Icon, WarningOutlineIcon, IconButton } from 'native-base';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../../../constants'
import { useDispatch } from 'react-redux';
import { registerPassword } from '../../../../redux/reducer';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; 

type Props = NativeStackScreenProps<RootStackParams, 'PasswordInputScreen'>;

const PasswordInputScreen: React.FC<Props> = ({ navigation })=> {

    //change to global value
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch()

  const handleContinue = () => {
    if (password === '' || confirmPassword === '') {
        setError('Passwords cannot be empty');
      } else if (password !== confirmPassword) {
        setError("Passwords don't match");
      } else {
        setError('');
      dispatch(registerPassword(password));
      navigation.push("MoreInfoInputScreen");
    }
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
            secureTextEntry={!showPassword} // 控制密码显示
            borderColor="coolGray.300"
            _focus={{
              borderColor: 'coolGray.500',
            }}
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
        </FormControl>
        <FormControl isInvalid={!!error}>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword} // 控制密码显示
            borderColor="coolGray.300"
            _focus={{
              borderColor: 'coolGray.500',
            }}
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
        <Button mt={4} bg="#00A86B" _text={{ color: 'white' }} onPress={handleContinue}>
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default PasswordInputScreen;
