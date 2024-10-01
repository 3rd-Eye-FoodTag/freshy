import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Text,
  HStack,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {auth} from '../../../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useSelector} from 'react-redux';
import {registerAuth} from '../../../../redux/reducer';
import {v4 as uuidv4} from 'uuid';

import {doc, setDoc, collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../../../config/firebase';

const MoreInfoInputScreen: React.FC = () => {
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    gender: '',
    zipCode: '',
    uuid: '',
  });
  const user = useSelector(registerAuth);

  const {name, age, gender, zipCode} = userInfo;
  const {email, password} = user;

  const handleContinue = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Set user information in Firestore
      await setDoc(doc(db, 'Users', user.uid), {
        name: name,
        age: age,
        zipCode: zipCode,
        gender: gender,
        email: user.email,
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        createdAt: new Date(),
      });

      await setDoc(doc(db, 'Inventory', user.uid), {
        data: [],
      });

      console.log('User registered and data added to Firestore:', user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box flex={1} px={6} py={6} bg="white" justifyContent="flex-start">
      <Heading
        size="md"
        fontWeight="600"
        color="coolGray.800"
        textAlign="center"
        mb={2}>
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
            onChangeText={value =>
              setUserInfo(state => ({
                ...state,
                name: value,
              }))
            }
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
            <FormControl.Label fontSize="sm">Age</FormControl.Label>
            <Input
              placeholder="Age"
              value={age}
              onChangeText={value =>
                setUserInfo(state => ({
                  ...state,
                  age: value,
                }))
              }
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
              onValueChange={value =>
                setUserInfo(state => ({
                  ...state,
                  gender: value,
                }))
              }
              borderColor="coolGray.300"
              borderRadius="8"
              fontSize="md"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}>
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
              <Select.Item label="Prefer not to say" value="not_specified" />
            </Select>
          </FormControl>
        </HStack>
        <FormControl>
          <FormControl.Label fontSize="sm">Zip Code</FormControl.Label>
          <Input
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={value =>
              setUserInfo(state => ({
                ...state,
                zipCode: value,
              }))
            }
            keyboardType="numeric"
            borderColor="coolGray.300"
            borderRadius="8"
            fontSize="md"
            _focus={{
              borderColor: 'coolGray.500',
            }}
          />
        </FormControl>
        <Button
          mt={8}
          bg={'#00A86B'}
          _text={{color: 'white', fontSize: 'md'}}
          borderRadius="8"
          onPress={handleContinue}
          isDisabled={!name || !gender || !gender || !zipCode}>
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
