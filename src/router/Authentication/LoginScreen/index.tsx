import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
  FormControl,
  Link,
  LinkText,
} from '@/components/ui'; // Adjust imports based on your Gluestack setup
import {useQueryClient} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import EyeOffIcon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      queryClient.invalidateQueries(); // Invalidate and refetch the auth query
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box className="flex-1 px-4 py-8 bg-white">
        {/* Heading */}
        <Heading className="text-center text-lg font-bold mb-6">
          Welcome Back!
        </Heading>

        {/* Form */}
        <VStack className="space-y-4">
          {/* Email Field */}
          <FormControl isInvalid={!!error}>
            <Text className="text-sm mb-2">Email</Text>
            <Input className="border border-gray-300 rounded px-3 py-2">
              <InputField
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-gray-800 placeholder-gray-400"
              />
            </Input>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={!!error}>
            <Text className="text-sm mb-2 mt-8">Password</Text>
            <Input className="border border-gray-300 rounded px-3 py-2">
              <InputField
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                className="text-gray-800 placeholder-gray-400"
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={EyeOffIcon}
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#6B7280" // CoolGray
                />
              </InputSlot>
            </Input>
            {error && (
              <Text className="text-xs text-red-500 mt-2">{error}</Text>
            )}
          </FormControl>

          {/* Login Button */}
          <Button
            className="bg-[#00A86B] rounded px-4 my-4"
            onPress={handleLogin}>
            <ButtonText className="text-white text-sm font-bold text-center">
              Login
            </ButtonText>
          </Button>

          {/* Forgot Password Link */}
          <Link
            className="mt-4 text-center text-blue-500"
            onPress={() => {
              console.log('Forgot password pressed');
            }}>
            <LinkText> Forgot password?</LinkText>
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
