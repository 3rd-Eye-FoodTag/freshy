import React, {useState} from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui'; // Adjust imports for Gluestack-UI
import {useSelector} from 'react-redux';
// import {auth} from '../../../../config/firebase';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
import {registerAuth} from '../../../../redux/reducer';
// import {doc, setDoc} from 'firebase/firestore';
// import {db} from '../../../../config/firebase';
import IconComponent from 'react-native-vector-icons/MaterialIcons';

const MoreInfoInputScreen: React.FC = () => {
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    gender: '',
    zipCode: '',
  });

  const user = useSelector(registerAuth);
  const {name, age, gender, zipCode} = userInfo;
  const {email, password} = user;

  const handleContinue = async () => {
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password,
    //   );
    //   const user = userCredential.user;
    //   // Set user information in Firestore
    //   await setDoc(doc(db, 'Users', user.uid), {
    //     name,
    //     age,
    //     zipCode,
    //     gender,
    //     email: user.email,
    //     uid: user.uid,
    //     createdAt: new Date(),
    //   });
    //   await setDoc(doc(db, 'Inventory', user.uid), {
    //     data: [],
    //   });
    //   console.log('User registered and data added to Firestore:', user);
    // } catch (err: any) {
    //   setError(err.message);
    // }
  };

  return (
    <Box className="flex-1 px-6 py-6 bg-white">
      {/* Heading */}
      <Text className="text-lg font-bold text-gray-800 text-center mb-2">
        Tell us a bit more
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-8">
        Just need to answer a few more questions to satisfy your personal needs
      </Text>

      {/* Form */}
      <VStack className="space-y-6">
        {/* Your Name */}
        <Box>
          <Text className="text-sm text-gray-600 mb-2">Your Name</Text>
          <Input className="border border-gray-300 rounded px-3 py-2">
            <InputField
              placeholder="Your Name"
              value={name}
              onChangeText={value =>
                setUserInfo(state => ({
                  ...state,
                  name: value,
                }))
              }
              className="text-gray-800 placeholder-gray-400"
            />
          </Input>
        </Box>

        {/* Age and Gender */}
        <Box className="flex flex-row space-x-3">
          <Box className="flex-1">
            <Text className="text-sm text-gray-600 mb-2">Age</Text>
            <Input className="border border-gray-300 rounded px-3 py-2">
              <InputField
                placeholder="Age"
                value={age}
                onChangeText={value =>
                  setUserInfo(state => ({
                    ...state,
                    age: value,
                  }))
                }
                keyboardType="numeric"
                className="text-gray-800 placeholder-gray-400"
              />
            </Input>
          </Box>
          <Box className="flex-1">
            <Text className="text-sm text-gray-600 mb-2">Gender</Text>
            <Select>
              <SelectTrigger>
                <SelectInput
                  value={gender}
                  placeholder="Gender"
                  onValueChange={value =>
                    setUserInfo(state => ({
                      ...state,
                      gender: value,
                    }))
                  }
                />
                <SelectIcon as={IconComponent} name="arrow-drop-down" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem
                    label="Male"
                    value="Male"
                    onPress={() =>
                      setUserInfo(state => ({
                        ...state,
                        gender: 'Male',
                      }))
                    }
                  />
                  <SelectItem
                    label="Female"
                    value="Female"
                    onPress={() =>
                      setUserInfo(state => ({
                        ...state,
                        gender: 'Female',
                      }))
                    }
                  />
                  <SelectItem
                    label="Prefer not to say"
                    value="not_specified"
                    onPress={() =>
                      setUserInfo(state => ({
                        ...state,
                        gender: 'Prefer not to say',
                      }))
                    }
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
        </Box>

        {/* Zip Code */}
        <Box>
          <Text className="text-sm text-gray-600 mb-2">Zip Code</Text>
          <Input className="border border-gray-300 rounded px-3 py-2">
            <InputField
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={value =>
                setUserInfo(state => ({
                  ...state,
                  zipCode: value,
                }))
              }
              keyboardType="numeric"
              className="text-gray-800 placeholder-gray-400"
            />
          </Input>
        </Box>

        {/* Continue Button */}
        <Button
          className={`bg-[#00A86B] rounded px-4 py-3 my-8 ${
            !name || !age || !gender || !zipCode ? 'opacity-50' : ''
          }`}
          onPress={handleContinue}
          isDisabled={!name || !age || !gender || !zipCode}>
          <ButtonText className="text-white text-sm font-bold text-center ">
            Continue
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default MoreInfoInputScreen;
