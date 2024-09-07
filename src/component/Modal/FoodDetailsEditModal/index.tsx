import React, { useState, useEffect } from 'react';
import { Modal, Button, FormControl, Input, VStack, HStack, Text, Select, Image, Center, ScrollView } from 'native-base';
import { FoodDetailsProps } from '../../../utils/interface';
import { updateExistedInventoryItem, postInventoryUpdateToFirebase } from '../../../utils/api';

import { useSelector } from 'react-redux';
import { currentUser } from '../../../redux/reducer';
import { getImageURL } from '../../../utils/constants';

const FoodDetailsModal: React.FC<{ visible: boolean; onClose: () => void; foodDetails: FoodDetailsProps | null }> = ({
  visible,
  onClose,
  foodDetails,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FoodDetailsProps>(foodDetails);
  const currentUserUUID = useSelector(currentUser)

  useEffect(() => {
    if (foodDetails) {
      setFormData(foodDetails);
    }
  }, [foodDetails]);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if(foodDetails) {
      updateExistedInventoryItem(currentUserUUID, {...formData, id: foodDetails.id})
    } else {
      postInventoryUpdateToFirebase(currentUserUUID, [{...formData, id: crypto.randomUUID()}])
    }
    
    setIsEditMode(false);
  };

  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <Modal.Content maxWidth="100%" height="80%" marginTop="auto" borderTopRadius="20px">
        <Modal.CloseButton />
        <ScrollView>
          <VStack space={4} px={4} mt={4}>
            <Center>
              <Image
                source={{uri: getImageURL(foodDetails.foodPhoto )}}
                alt={formData.name}
                size="xl"
                borderRadius={100}
                mb={4}
              />
              <Text fontSize="2xl" fontWeight="bold">{formData.name}</Text>
              <Text color="green.500">{formData.daysLeft} days left</Text>
            </Center>
            <HStack space={3} justifyContent="center">
              <Button
                colorScheme={formData.location === 'Fridge' ? 'green' : 'coolGray'}
                size="sm"
                onPress={() => isEditMode && handleInputChange('location', 'Fridge')}
                isDisabled={!isEditMode}
              >
                Fridge
              </Button>
              <Button
                colorScheme={formData.location === 'Freezer' ? 'green' : 'coolGray'}
                size="sm"
                onPress={() => isEditMode && handleInputChange('location', 'Freezer')}
                isDisabled={!isEditMode}
              >
                Freezer
              </Button>
              <Button
                colorScheme={formData.location === 'Pantry' ? 'green' : 'coolGray'}
                size="sm"
                onPress={() => isEditMode && handleInputChange('location', 'Pantry')}
                isDisabled={!isEditMode}
              >
                Pantry
              </Button>
            </HStack>
            <FormControl>
              <FormControl.Label>Expiry Date</FormControl.Label>
              <Input
                value={formData.expiryDate}
                onChangeText={(value) => handleInputChange('expiryDate', value)}
                isDisabled={!isEditMode}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Reminder</FormControl.Label>
              <Input
                value={formData.reminder}
                onChangeText={(value) => handleInputChange('reminder', value)}
                isDisabled={!isEditMode}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Category</FormControl.Label>
              <Select
                selectedValue={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                isDisabled={!isEditMode}
              >
                <Select.Item label="Vegetable" value="Vegetable" />
                <Select.Item label="Fruit" value="Fruit" />
                <Select.Item label="Dairy" value="Dairy" />
                <Select.Item label="Meat" value="Meat" />
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Storage Tips</FormControl.Label>
              <Input
                value={formData.storageTips}
                onChangeText={(value) => handleInputChange('storageTips', value)}
                isDisabled={!isEditMode}
                multiline
                numberOfLines={4}
              />
            </FormControl>
          </VStack>
        </ScrollView>
        <HStack justifyContent="space-between" alignItems="center" px={4} py={4} borderTopWidth={1} borderColor="coolGray.200">
          <HStack
            space={1}
            justifyContent="center"
            alignItems="center"
          >
            {isEditMode && (
              <Button
                onPress={() => handleInputChange('quantity', formData.quantity + 1)}
                variant="ghost"
                size="sm"
                isDisabled={!isEditMode}
              >
                +
              </Button>
            )}
            <Text fontSize="lg" fontWeight="bold">
              {formData.quantity}
              <Text fontSize="sm" fontWeight="normal"> left</Text>
            </Text>
            {isEditMode && (
              <Button
                onPress={() => handleInputChange('quantity', Math.max(formData.quantity - 1, 0))}
                variant="ghost"
                size="sm"
                isDisabled={!isEditMode}
              >
                -
              </Button>
            )}
          </HStack>
          <HStack space={2}>
            <Button onPress={onClose} colorScheme="coolGray" rounded="full">
              Cancel
            </Button>
            <Button onPress={isEditMode ? handleSave : toggleEditMode} colorScheme="green" rounded="full">
              {isEditMode ? 'Save' : 'Edit'}
            </Button>
          </HStack>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};

export default FoodDetailsModal;
