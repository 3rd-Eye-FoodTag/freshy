import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Select, CheckIcon, Text, HStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { auth } from '../../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const MoreInfoInputScreen: React.FC = () => {
  //change to global value
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, "tyang0119@gmail.com", "123456");
      // User signed up successfully
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleContinue = () => {
    if (name === '') {
      setError('Name cannot be empty');
    } else {
      setError('');
      // Complete the registration or navigate to the next step
    }
  };

  return (
    <Box flex={1} px={6} py={6} bg="white" justifyContent="flex-start">
      <Heading size="md" fontWeight="600" color="coolGray.800" textAlign="center" mb={2}>
        Tell us a bit more
      </Heading>
      <Text fontSize="sm" textAlign="center" mb={8} color="gray.500">
        Just need to answer a few more questions to satisfy your personal needs
      </Text>
      <VStack space={4}>
        <FormControl isInvalid={!!error}>
          <FormControl.Label fontSize="sm">Your Name</FormControl.Label>
          <Input
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
            borderColor="coolGray.300"
            borderRadius="8"
            fontSize="md"
            _focus={{
              borderColor: 'coolGray.500',
            }}
          />
        </FormControl>
        <HStack space={3} alignItems="center">
          <FormControl flex={1}>
            <FormControl.Label fontSize="sm">Age (Optional)</FormControl.Label>
            <Input
              placeholder="Age"
              value={age}
              onChangeText={(text) => setAge(text)}
              keyboardType="numeric"
              borderColor="coolGray.300"
              borderRadius="8"
              fontSize="md"
              _focus={{
                borderColor: 'coolGray.500',
              }}
            />
          </FormControl>
          <FormControl flex={1}>
            <FormControl.Label fontSize="sm">Gender</FormControl.Label>
            <Select
              selectedValue={gender}
              placeholder="Gender"
              onValueChange={(value) => setGender(value)}
              borderColor="coolGray.300"
              borderRadius="8"
              fontSize="md"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
            >
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
              <Select.Item label="Prefer not to say" value="not_specified" />
            </Select>
          </FormControl>
        </HStack>
        <FormControl>
          <FormControl.Label fontSize="sm">Zip Code</FormControl.Label>
          <Input
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={(text) => setZipCode(text)}
            keyboardType="numeric"
            borderColor="coolGray.300"
            borderRadius="8"
            fontSize="md"
            _focus={{
              borderColor: 'coolGray.500',
            }}
          />
        </FormControl>
        {error ? (
          <FormControl.ErrorMessage leftIcon={<CheckIcon size="xs" />}>
            {error}
          </FormControl.ErrorMessage>
        ) : null}
        <Button
          mt={8}
          bg={'#00A86B'}
          _text={{ color: 'white', fontSize: 'md' }}
          borderRadius="8"
          onPress={handleSubmitted}
          isDisabled={!name || !gender}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputHalfWidth: {
    flex: 1,
  },
});

export default MoreInfoInputScreen;
