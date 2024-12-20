import React, {useState} from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  InputField,
  InputSlot,
  Icon,
  Button,
  ButtonText,
} from '@/components/ui'; // Replace with your Gluestack components
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../constants';
import {useDispatch} from 'react-redux';
import {registerPassword} from '../../../../redux/reducer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParams, 'PasswordInputScreen'>;

const PasswordInputScreen: React.FC<Props> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (password === '' || confirmPassword === '') {
      setError('Passwords cannot be empty');
    } else if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError('');
      dispatch(registerPassword(password));
      navigation.push('MoreInfoInputScreen');
    }
  };

  return (
    <Box className="flex-1 px-4 py-8 bg-white">
      <Text className="text-lg font-bold text-gray-800 text-center mb-6">
        Choose your password
      </Text>
      <VStack className="space-y-6" space="lg">
        <Box>
          <Text className="text-sm text-gray-600 mb-2">Create Password</Text>
          <Input
            className={`border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}>
            <InputField
              placeholder="Enter your password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
              className="text-gray-800 placeholder-gray-400"
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={MaterialIcons}
                name={showPassword ? 'visibility' : 'visibility-off'}
                size="sm"
                color="coolGray.500"
              />
            </InputSlot>
          </Input>
        </Box>
        <Box>
          <Text className="text-sm text-gray-600 mb-2">Confirm Password</Text>
          <Input
            className={`border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}>
            <InputField
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={!showPassword}
              className="text-gray-800 placeholder-gray-400"
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={MaterialIcons}
                name={showPassword ? 'visibility' : 'visibility-off'}
                size="sm"
                color="coolGray.500"
              />
            </InputSlot>
          </Input>
          {error && <Text className="text-xs text-red-500 mt-2">{error}</Text>}
        </Box>
        <Button className="bg-[#00A86B] rounded my-6" onPress={handleContinue}>
          <ButtonText className="text-white text-sm font-bold text-center">
            Continue
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default PasswordInputScreen;
