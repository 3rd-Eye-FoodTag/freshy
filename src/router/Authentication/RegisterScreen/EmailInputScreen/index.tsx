import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Box,
  Text,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@/components/ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../constants';
import {useDispatch} from 'react-redux';
import {registerEmail} from '../../../../redux/reducer';

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
    <SafeAreaView className="flex-1 bg-white">
      <Box className="flex-1 px-4 py-8">
        {/* Heading */}
        <Text className="text-lg font-bold text-gray-800 text-center mb-6">
          Enter your email address
        </Text>

        {/* Email Form */}
        <VStack className="space-y-4" space="lg">
          {/* Input with error handling */}
          <Box>
            <Text className="text-sm text-gray-600 mb-2">Email</Text>
            {/* New Input with InputField */}
            <Input
              variant="outline"
              size="md"
              isInvalid={!!error}
              className={`${
                error ? 'border-red-500' : 'border-gray-300'
              } border rounded px-3 py-2`}>
              <InputField
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-gray-800 placeholder-gray-400"
              />
            </Input>
            {/* Error message */}
            {error && (
              <Text className="text-xs text-red-500 mt-1">{error}</Text>
            )}
          </Box>

          {/* Continue Button */}
          <Button
            className="bg-[#00A86B] rounded px-4 py-3"
            onPress={handleContinue}>
            <ButtonText className="text-white text-sm font-bold text-center">
              Continue
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default EmailInputScreen;
