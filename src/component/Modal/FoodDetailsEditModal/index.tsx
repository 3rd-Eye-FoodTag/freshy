import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  FormControl,
  Input,
  VStack,
  HStack,
  Text,
  Select,
  Image,
  Center,
  ScrollView,
} from 'native-base';
import { FoodDetailsProps } from '../../../utils/interface';
import {
  updateExistedInventoryItem,
  postInventoryUpdateToFirebase,
} from '../../../utils/api';

import { useSelector } from 'react-redux';
import { currentUser } from '../../../redux/reducer';
import { getImageURL } from '../../../utils/constants';
import {
  calculateDaysDifference,
  convertTimeStringToDate,
} from '../../../utils/utils';

import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateSelector from '../../DateSelector';

const FoodDetailsModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  foodDetails: FoodDetailsProps | null;
}> = ({ visible, onClose, foodDetails }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FoodDetailsProps>(foodDetails);
  const currentUserUUID = useSelector(currentUser);

  useEffect(() => {
    if (foodDetails) {
      setFormData(foodDetails);
    }
  }, [foodDetails]);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (foodDetails) {
      updateExistedInventoryItem(currentUserUUID, {
        ...formData,
        id: foodDetails.id,
      });
    } else {
      postInventoryUpdateToFirebase(currentUserUUID, [
        { ...formData, id: crypto.randomUUID() },
      ]);

      setIsEditMode(false);
    }
  };

  let daysLeft = calculateDaysDifference(formData?.expiryDate);

  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <Modal.Content
        maxWidth="100%"
        height="80%"
        marginTop="auto"
        borderTopRadius="20px">
        <Modal.CloseButton />
        <ScrollView>


          <VStack space={4} px={4} mt={4}>
            <Center>
              <HStack space={4} alignItems="center" justifyContent="center">
                <View style={styles.leftIcon}>
                  <TouchableOpacity style={styles.iconLeftButton}>
                    <Icon as={AntDesign} name={'shoppingcart'} size="sm" color={'black'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Add to List</Text>
                </View>

                <Image
                  source={{ uri: getImageURL(foodDetails.foodPhoto) }}
                  alt={formData.name}
                  size="xl"
                  borderRadius={100}
                  mb={4}
                />

                <View style={styles.rightIcon}>
                  <TouchableOpacity style={styles.iconRightButton}>
                    <Icon as={MaterialCommunityIcons} name={'pac-man'} size="sm" color={'black'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Eat First</Text>
                </View>
              </HStack>

              <View style={styles.foodNameRow}>
                <Text fontSize="2xl" fontWeight="bold">
                  {formData.name}
                </Text>
                <TouchableOpacity>
                  <Icon as={FontAwesome5} name={'pencil-alt'} size="sm" color={'black'} />
                </TouchableOpacity>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${Math.max((daysLeft / 14) * 100, 0)}%` }]} />
              </View>
              <Text color="green.500">{daysLeft} days left</Text>
            </Center>
            <HStack space={3} justifyContent="center">
              <Button
                colorScheme={
                  formData.storagePlace === 'Fridge' ? 'green' : 'coolGray'
                }
                size="sm"
                onPress={() =>
                  isEditMode && handleInputChange('storagePlace', 'Fridge')
                }
                isDisabled={!isEditMode}>
                Fridge
              </Button>
              <Button
                colorScheme={
                  formData.storagePlace === 'Freezer' ? 'green' : 'coolGray'
                }
                size="sm"
                onPress={() =>
                  isEditMode && handleInputChange('storagePlace', 'Freezer')
                }
                isDisabled={!isEditMode}>
                Freezer
              </Button>
              <Button
                colorScheme={
                  formData.storagePlace === 'Pantry' ? 'green' : 'coolGray'
                }
                size="sm"
                onPress={() =>
                  isEditMode && handleInputChange('storagePlace', 'Pantry')
                }
                isDisabled={!isEditMode}>
                Pantry
              </Button>
            </HStack>
            <FormControl>
              <FormControl.Label>Expiry Date</FormControl.Label>
              <Input
                value={convertTimeStringToDate(formData.expiryDate)}
                onChangeText={value => handleInputChange('expiryDate', value)}
                isDisabled={!isEditMode}
              />
            </FormControl>
            <DateSelector
              label="Expiry Date"
              date={convertTimeStringToDate(formData.expiryDate)}
              options={['in 3 days', 'in 7 days', 'Custom']}
              // TODO: Need to review onSelectOption logic
              onSelectOption={(selectedOption) => handleInputChange('expiryDate', selectedOption)}
            />

            <FormControl>
              <FormControl.Label>Reminder</FormControl.Label>
              <Input
                value={formData.reminder}
                onChangeText={value => handleInputChange('reminder', value)}
                isDisabled={!isEditMode}
              />
            </FormControl>
            <DateSelector
              label="Reminder Date"
              date={formData.reminder}
              options={['2 days', '3 days', '7 days', '1 month', '2 months', '6 months']}
              // TODO: Need to review onSelectOption logic
              onSelectOption={(selectedOption) => handleInputChange('reminder', selectedOption)}
            />
            <FormControl>
              <FormControl.Label>Category</FormControl.Label>
              <Select
                selectedValue={formData.category}
                onValueChange={value => handleInputChange('category', value)}
                isDisabled={!isEditMode}>
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
                onChangeText={value => handleInputChange('storageTips', value)}
                isDisabled={!isEditMode}
                multiline
                numberOfLines={4}
              />
            </FormControl>
          </VStack>
          <Text style={styles.recordDate}>Recorded on {convertTimeStringToDate(formData.createdAt)}</Text>
        </ScrollView>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={4}
          borderTopWidth={1}
          borderColor="coolGray.200">
          <HStack space={1} justifyContent="center" alignItems="center">
            {isEditMode && (
              <Button
                onPress={() =>
                  handleInputChange('quantity', formData.quantity + 1)
                }
                variant="ghost"
                size="sm"
                isDisabled={!isEditMode}>
                +
              </Button>
            )}
            <Text fontSize="lg" fontWeight="bold">
              {formData.quantity}
              <Text fontSize="sm" fontWeight="normal">
                {' '}
                left
              </Text>
            </Text>
            {isEditMode && (
              <Button
                onPress={() =>
                  handleInputChange(
                    'quantity',
                    Math.max(formData.quantity - 1, 0),
                  )
                }
                variant="ghost"
                size="sm"
                isDisabled={!isEditMode}>
                -
              </Button>
            )}
          </HStack>
          <HStack space={2}>
            <Button onPress={onClose} colorScheme="coolGray" rounded="full">
              Cancel
            </Button>
            <Button
              onPress={isEditMode ? handleSave : toggleEditMode}
              colorScheme="green"
              rounded="full">
              {isEditMode ? 'Save' : 'Edit'}
            </Button>
          </HStack>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({

  leftIcon: {
    marginTop: -20,
    alignItems: 'center',
  },
  rightIcon: {
    marginTop: -20,
    alignItems: 'center',
  },
  iconLeftButton: {
    width: 55,
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  iconRightButton: {
    width: 55,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  iconText: {
    fontSize: 17,
    fontFamily: 'PingFang SC',
    color: '#666666',
    marginTop: 5,
  },

  foodNameRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  progressBarContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: 350,
    height: 6,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgb(81, 179, 125)',
  },
  recordDate: {
    marginTop: 20,
    color: '#999',
    fontFamily: 'PingFang SC',
    fontSize: 17,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 200,
  },

});

export default FoodDetailsModal;
