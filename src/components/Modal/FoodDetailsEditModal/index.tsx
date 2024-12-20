import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Icon,
  Center,
  Input,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateExistedInventoryItem} from '../../../utils/api';
import {FoodDetailsProps} from '../../../utils/interface';
import {
  calculateDaysDifference,
  calculateExpirationDate,
  convertTimeStringToDate,
  transformDays,
} from '../../../utils/utils';
import OptionSelector from '../../OptionSelector';
import {currentUser} from '../../../redux/reducer';
import {defaultFoodImage, getImageURL} from '../../../utils/constants';
import {
  selectedFoodDetailsSelector,
  updateConfirmationList,
  updateModalConstant,
} from '../../../redux/reducer/storageReducer';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import _uniq from 'lodash/uniq';
import useHandleAddItem from '../../../hooks/useHandleAddItem';

const FoodDetailsEditModal: React.FC<{
  onClose?: () => void;
  foodDetails: FoodDetailsProps | null;
  isNewItem?: boolean;
}> = ({foodDetails, isNewItem}) => {
  const [nameField, setNameField] = useState<Boolean>(false);
  const [formData, setFormData] = useState<any>(foodDetails);

  const [storagePL, setStoragePL] = useState<any>('Fridge');
  const [expiryDate, setExpiryDate] = useState('');
  const [reset, setReset] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useDispatch();
  const currentUserUUID = useSelector(currentUser);
  const selectedFoodDetails = useSelector(selectedFoodDetailsSelector);
  const queryClient = useQueryClient();
  const {predictedFreshDurations} = foodDetails;

  const {addFoodToInventory} = useHandleAddItem();

  const handleDisable = formData.foodName === 'Unknown';

  useEffect(() => {
    if (!isNewItem) {
      setDisableButton(true);
    }
    setStoragePL(foodDetails.storagePlace);
  }, []);

  useEffect(() => {
    if (selectedFoodDetails && !isNewItem) {
      setFormData(selectedFoodDetails);
      setStoragePL(foodDetails.storagePlace);
      setExpiryDate(foodDetails.expiryDate);
    }
  }, [dispatch, foodDetails, isNewItem, selectedFoodDetails]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prevData => ({
      ...(prevData || {}),
      [name]: value,
    }));
  };

  useEffect(() => {
    let expirationInDays, newExpirationDate;

    if (storagePL === 'Fridge') {
      expirationInDays = predictedFreshDurations.fridge;
    } else if (storagePL === 'Freezer') {
      expirationInDays = predictedFreshDurations.freezer;
    } else if (storagePL === 'Pantry') {
      expirationInDays = predictedFreshDurations.room;
    }

    newExpirationDate = calculateExpirationDate(expirationInDays);

    setExpiryDate(newExpirationDate);
    handleInputChange('expiryDate', newExpirationDate);
  }, [storagePL]);

  const updateFoodItem = useMutation({
    mutationFn: async (postUpdatePayload: any) => {
      const {userId, data} = postUpdatePayload;
      return await updateExistedInventoryItem(userId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInventory']});
    },
  });

  const handleSave = () => {
    if (isNewItem) {
      // dispatch(updateConfirmationList(formData));
      addFoodToInventory(true, [formData]);
      // dispatch(
      //   updateModalConstant({
      //     modalConstant: 'MANNUAL_INPUT_MODAL',
      //     modalProps: {showConfirmation: true},
      //   }),
      // );
    } else {
      updateExistedInventoryItem(currentUserUUID, formData);
      updateFoodItem.mutate({userId: currentUserUUID, data: formData});
      dispatch(
        updateModalConstant({
          modalConstant: '',
        }),
      );
    }
  };
  const daysLeft = calculateDaysDifference(expiryDate);

  let options = [];
  let storeMethod = 'room';

  if (storagePL === 'Pantry') {
    storeMethod = 'room';
  } else if (storagePL === 'Freezer') {
    storeMethod = 'freezer';
  } else if (storagePL === 'Fridge') {
    storeMethod = 'fridge';
  }

  options = [
    Math.floor(predictedFreshDurations[storeMethod] * 0.75),
    Number(predictedFreshDurations[storeMethod]),
    'Custom',
  ];

  // console.log({formData});

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <VStack space={4} px={4} mt={4}>
          <Center>
            <HStack space={4} alignItems="center" justifyContent="center">
              <View style={styles.leftIcon}>
                <TouchableOpacity style={styles.iconLeftButton}>
                  <Icon
                    as={AntDesign}
                    name="shoppingcart"
                    size="sm"
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.iconText}>Add to List</Text>
              </View>
              <Image
                source={{
                  uri:
                    (!isNewItem && getImageURL(formData?.imageName)) ||
                    defaultFoodImage,
                }}
                alt={formData?.foodName}
                defaultSource={{uri: defaultFoodImage}}
                size="xl"
                borderRadius={100}
                mb={4}
              />
              <View style={styles.rightIcon}>
                <TouchableOpacity style={styles.iconRightButton}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="pac-man"
                    size="sm"
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.iconText}>Eat First</Text>
              </View>
            </HStack>
            <View style={styles.foodNameRow}>
              {!nameField ? (
                <Text fontSize="2xl" fontWeight="bold">
                  {formData?.foodName || 'New Food'}
                </Text>
              ) : (
                <Input
                  variant="underlined"
                  placeholder="Type Food Name"
                  value={formData.foodName}
                  onChangeText={text => {
                    handleInputChange('foodName', text); // Update `formData.foodName`
                  }}
                  size="2xl"
                  w="30%"
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  setNameField(!nameField);
                }}>
                <Icon
                  as={FontAwesome5}
                  name="pencil-alt"
                  size="sm"
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${Math.max((daysLeft / 14) * 100, 0)}%`},
                ]}
              />
            </View> */}
            <Text color="green.500">{transformDays(daysLeft)} left</Text>
          </Center>
          <OptionSelector
            options={['Fridge', 'Freezer', 'Pantry']}
            onSelectOption={selectedOption => {
              setDisableButton(false);
              handleInputChange('storagePlace', selectedOption);
              setStoragePL(selectedOption);
              setReset(true);
            }}
            isEditMode={true}
            defaultOption={foodDetails?.storagePlace || 'Fridge'}
          />
          <OptionSelector
            label="Expiry Date"
            type="date"
            value={convertTimeStringToDate(expiryDate)}
            options={_uniq(options)}
            onSelectOption={selectedOption => {
              setDisableButton(false);
              setReset(false);
              const expiry = calculateExpirationDate(selectedOption);
              setExpiryDate(expiry);
              handleInputChange('expiryDate', expiry);
            }}
            isEditMode={true}
            reset={reset}
            defaultOption={Number(predictedFreshDurations[storeMethod])}
          />
          {/* <OptionSelector
            label="Reminder Date"
            value={formData?.reminder}
            options={[2, 3, 7, 30, 60, 180]}
            onSelectOption={selectedOption => {
              setReset(false);
            }}
            isEditMode={true}
            reset={reset}
          /> */}
          <OptionSelector
            type="dropdown"
            label="Category"
            options={[
              {label: 'Vegetable', value: 'Vegetable'},
              {label: 'Fruit', value: 'Fruit'},
              {label: 'Dairy', value: 'Dairy'},
              {label: 'Meat', value: 'Meat'},
            ]}
            onSelectOption={category => {
              setDisableButton(false);
              handleInputChange('category', category);
            }}
            defaultOption={foodDetails?.category}
          />
          <OptionSelector
            type="comment"
            label="Storage Tips"
            onSelectOption={value => {
              setDisableButton(false);
              handleInputChange('storageTip', value);
            }}
            defaultOption={foodDetails.storageTip}
          />
          <Text style={styles.recordDate}>
            Recorded on {convertTimeStringToDate(formData?.createdAt)}
          </Text>
          <Text style={styles.recordDate}>
            {formData.isFoodFromWiki
              ? 'Food is in our FoodWIki'
              : 'First time to see this food in our wiki'}
          </Text>
        </VStack>
      </ScrollView>
      <View style={styles.bottomBar}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={4}
          borderTopWidth={1}
          borderColor="coolGray.200">
          <HStack space={3} alignItems="center">
            <Button
              disabled={formData?.quantity === 0}
              onPress={() => {
                setDisableButton(false);
                handleInputChange('quantity', formData?.quantity - 1);
              }}>
              -
            </Button>
            <Text fontSize="lg">{formData?.quantity}</Text>
            <Button
              onPress={() => {
                setDisableButton(false);
                handleInputChange('quantity', formData?.quantity + 1);
              }}>
              +
            </Button>
          </HStack>
          <Button
            onPress={handleSave}
            colorScheme="green"
            minWidth={150}
            isDisabled={disableButton || handleDisable}
            bg={disableButton ? 'gray.400' : '#00A86B'}
            _disabled={{bg: 'gray.400'}}>
            Finish
          </Button>
        </HStack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Make sure there's space for the bottom bar
  },
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
    marginBottom: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
});

export default FoodDetailsEditModal;
