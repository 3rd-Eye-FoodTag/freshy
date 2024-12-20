/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../constants';
import {useSelector} from 'react-redux';
import {currentUser} from '../../../redux/reducer';
import {
  Button,
  ButtonText,
  ButtonGroup,
  Heading,
  Text,
  Box,
  VStack,
} from '@/components/ui';

type Props = NativeStackScreenProps<RootStackParams, 'WelcomeScreen'>;

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const current = useSelector(currentUser);

  useEffect(() => {
    navigation.push('HomePage');
  }, [current, navigation]);

  const goToRigsterScreen = () => {
    navigation.push('EmailInputScreen');
  };

  const goToLoginInScreen = () => {
    navigation.push('LoginScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Box className="flex-1 justify-between">
        <ImageBackground
          source={require('../../../assets/welcomeBG.png')}
          style={{width: '100%', height: 300}}
          resizeMode="cover"
        />
        <VStack
          space="md"
          className="items-center justify-center w-[90%] mx-auto mb-8" // Add margin-bottom
        >
          <Heading size="2xl" className="text-center">
            Welcome to 3rd Eye
          </Heading>
          <Text size="md" className="text-[#00A86B] text-center">
            Your Smart Fridge Pal
          </Text>
          <ButtonGroup className="space-y-4 w-full items-center">
            <Button
              size="lg"
              onPress={goToRigsterScreen}
              variant="solid"
              className="bg-[#00A86B] justify-center items-center w-[80%] h-12 rounded-lg">
              <ButtonText className="text-[#FFFFFF] font-bold text-center">
                Sign Up
              </ButtonText>
            </Button>
            {/* Log In Button */}
            <Button
              size="lg"
              action="secondary"
              variant="outline"
              onPress={goToLoginInScreen}
              className="border border-[#00A86B] justify-center items-center w-[80%] h-12 rounded-lg">
              <ButtonText className="text-[#00A86B] font-bold text-center">
                Log In
              </ButtonText>
            </Button>
          </ButtonGroup>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
