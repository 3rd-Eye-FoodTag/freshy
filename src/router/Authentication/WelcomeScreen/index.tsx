import React from 'react';
import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native'
import { Box, Center, Heading, Text, Button, VStack } from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../../constants';

type Props = NativeStackScreenProps<RootStackParams, 'WelcomeScreen'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToRigsterScreen = () => {
    navigation.push('EmailInputScreen');
  }

  const goToLoginInScreen = () => {
    navigation.push('LoginScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} bg="white">
        <Center flex={1}>
          <ImageBackground
            source={require('../../../assets/welcomeBG.png')} // Replace with your image URL
            style={{ width: '100%', height: 300, top: -60 }}
            resizeMode="cover"
          />
          <VStack w="75%" space={4} mt={8} alignItems="center" justifyContent="center" >
            <Heading size="lg">Welcome to 3rd Eye</Heading>
            <Text fontSize="md" color="gray.500">
              Your Smart Fridge Pal
            </Text>
            <Button 
              size="lg"
              bg="#00A86B"
              w="75%"
              _text={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              onPress={() => {goToRigsterScreen()}}
            >
              Sign Up
            </Button>
            <Button
              size="lg"
              variant="outline"
              borderColor="green.500"
              w="75%"
              alignItems="center"
              justifyContent="center"
              _text={{
                color: '#00A86B',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              onPress={() => {goToLoginInScreen()}}
            >
              Log In
            </Button>
          </VStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      textAlign: "center", 
    }
  });