import React from 'react';
import {
  Modal,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  ScrollView,
  CloseIcon,
  Center,
} from 'native-base';

const FoodDetailsModal: React.FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <Modal.Content
        maxWidth="100%"
        height="80%"
        marginTop="auto"
        borderTopRadius="20px">
        <Modal.CloseButton />
        {/* <Modal.Header>Food Details</Modal.Header> */}
        <ScrollView>
          <Center>
            {/* Image and Title */}
            <Image
              source={require('../../../assets/Fruit/0001_Apple_2.jpg')} // Replace with your image URL
              alt="Food Image"
              size="xl"
              borderRadius={100}
              mt={3}
            />
            <Text fontSize="xl" fontWeight="bold" mt={2}>
              Eggplant
            </Text>
            <Text color="green.500" fontSize="md" mb={3}>
              7 days left
            </Text>
          </Center>

          {/* Categories and Details */}
          <VStack space={4} px={4} mt={4}>
            <HStack justifyContent="center" space={3}>
              <Button colorScheme="green" size="sm">
                Fridge
              </Button>
              <Button colorScheme="gray" size="sm">
                Freezer
              </Button>
              <Button colorScheme="gray" size="sm">
                Pantry
              </Button>
            </HStack>

            <VStack space={2}>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Expiry Date</Text>
                <Text>01/20/2024</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Reminder</Text>
                <Text>2 Days Before Exp</Text>
              </HStack>
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Category</Text>
              <Box bg="coolGray.100" px={3} py={2} rounded="md">
                <Text>Vegetable</Text>
              </Box>
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Others</Text>
              <Box bg="coolGray.100" px={3} py={2} rounded="md">
                <Text>Other Category</Text>
              </Box>
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Storage Tips</Text>
              <Box bg="coolGray.100" px={3} py={2} rounded="md">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </VStack>

            <Text fontSize="xs" color="gray.500" textAlign="center" mt={4}>
              Recorded on 01/18/2024
            </Text>
          </VStack>

          {/* Bottom Section */}
          <HStack
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={4}
            borderTopWidth={1}
            borderColor="coolGray.200">
            <Text fontSize="lg">2 left</Text>
            <Button onPress={onClose} colorScheme="green" rounded="full">
              Finish
            </Button>
          </HStack>
        </ScrollView>
      </Modal.Content>
    </Modal>
  );
};

export default FoodDetailsModal;
