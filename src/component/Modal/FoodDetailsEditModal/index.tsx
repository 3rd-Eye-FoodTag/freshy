import React, { useState, useEffect } from 'react';
import { Modal, Center, VStack, HStack, Text, Button, Image, ScrollView, Input, Select } from 'native-base';

// Define the interface for the data props
import { FoodDetailsProps } from '../../../utils/interface';

// Update the component to accept data from parent component
const FoodDetailsEditModal: React.FC<{ visible: boolean; onClose: () => void; data: FoodDetailsProps }> = ({
  visible,
  onClose,
  data,
}) => {
  // Initialize state with the passed data
  const [selectedLocation, setSelectedLocation] = useState(data.location);
  const [expiryDate, setExpiryDate] = useState(data.expiryDate);
  const [reminder, setReminder] = useState(data.reminder);
  const [category, setCategory] = useState(data.category);
  const [others, setOthers] = useState(data.others);
  const [storageTips, setStorageTips] = useState(data.storageTips);

  useEffect(() => {
    // Update state when new data is passed from parent
    setSelectedLocation(data.location);
    setExpiryDate(data.expiryDate);
    setReminder(data.reminder);
    setCategory(data.category);
    setOthers(data.others);
    setStorageTips(data.storageTips);
  }, [data]);

  const handleSave = () => {
    // Save the updated data logic here
    onClose();
  };

  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <Modal.Content maxWidth="100%" height="80%" marginTop="auto" borderTopRadius="20px">
        <Modal.CloseButton />
        <Modal.Header>Edit Food Details</Modal.Header>
        <ScrollView>
          <Center>
            {/* Image and Title */}
            <Image
              source={{ uri: data.imageUrl }} // Use the image URL from the data props
              alt="Food Image"
              size="xl"
              borderRadius={100}
              mt={3}
            />
            <Text fontSize="xl" fontWeight="bold" mt={2}>
              {data.name}
            </Text>
            <Text color="green.500" fontSize="md" mb={3}>
              {data.daysLeft} days left
            </Text>
          </Center>

          {/* Categories and Details */}
          <VStack space={4} px={4} mt={4}>
            <Text fontWeight="bold">Location</Text>
            <HStack justifyContent="center" space={3}>
              <Button
                colorScheme={selectedLocation === 'Fridge' ? 'green' : 'gray'}
                size="sm"
                onPress={() => setSelectedLocation('Fridge')}
              >
                Fridge
              </Button>
              <Button
                colorScheme={selectedLocation === 'Freezer' ? 'green' : 'gray'}
                size="sm"
                onPress={() => setSelectedLocation('Freezer')}
              >
                Freezer
              </Button>
              <Button
                colorScheme={selectedLocation === 'Pantry' ? 'green' : 'gray'}
                size="sm"
                onPress={() => setSelectedLocation('Pantry')}
              >
                Pantry
              </Button>
            </HStack>

            <VStack space={2}>
              <Text fontWeight="bold">Expiry Date</Text>
              <Input
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
                placeholder="Expiry Date"
                variant="filled"
                keyboardType="default"
              />
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Reminder</Text>
              <Input
                value={reminder}
                onChangeText={(text) => setReminder(text)}
                placeholder="Reminder"
                variant="filled"
                keyboardType="default"
              />
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Category</Text>
              <Select
                selectedValue={category}
                minWidth="200"
                accessibilityLabel="Choose Category"
                placeholder="Choose Category"
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Select.Item label="Vegetable" value="Vegetable" />
                <Select.Item label="Fruit" value="Fruit" />
                <Select.Item label="Dairy" value="Dairy" />
                <Select.Item label="Meat" value="Meat" />
              </Select>
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Others</Text>
              <Input
                value={others}
                onChangeText={(text) => setOthers(text)}
                placeholder="Others"
                variant="filled"
                keyboardType="default"
              />
            </VStack>

            <VStack space={2}>
              <Text fontWeight="bold">Storage Tips</Text>
              <Input
                multiline
                numberOfLines={4}
                value={storageTips}
                onChangeText={(text) => setStorageTips(text)}
                placeholder="Storage Tips"
                variant="filled"
                keyboardType="default"
              />
            </VStack>

            <Text fontSize="xs" color="gray.500" textAlign="center" mt={4}>
              Recorded on 01/18/2024
            </Text>
          </VStack>

          {/* Bottom Section */}
          <HStack justifyContent="space-between" alignItems="center" px={4} py={4} borderTopWidth={1} borderColor="coolGray.200">
            <Button onPress={onClose} colorScheme="coolGray" rounded="full">
              Cancel
            </Button>
            <Button onPress={handleSave} colorScheme="green" rounded="full">
              Save
            </Button>
          </HStack>
        </ScrollView>
      </Modal.Content>
    </Modal>
  );
};

export default FoodDetailsEditModal;
