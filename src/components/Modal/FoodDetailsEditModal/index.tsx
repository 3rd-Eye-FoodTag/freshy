import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  VStack,
  HStack,
  Text,
  Button,
  ButtonText,
  Image,
  Icon,
  Center,
  Input,
  InputField,
} from '@/components/ui';
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
      addFoodToInventory(true, [formData]);
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

  return (
    <SafeAreaView className="flex-1 bg-white-700">
      <ScrollView className="pb-20">
        <VStack space="lg" className="px-4 mt-4">
          <Center>
            <HStack space="lg" className="item-center justify-center">
              <View className="items-center justify-center">
                <TouchableOpacity className="w-12 h-12 bg-white border border-gray-300 flex justify-center items-center rounded-md">
                  <Icon as={AntDesign} name="delete" size="lg" color="black" />
                </TouchableOpacity>
                <Text className="text-sm font-normal text-gray-500 mt-1">
                  Add to List
                </Text>
              </View>
              <Image
                source={{
                  uri:
                    (!isNewItem && getImageURL(formData?.imageName)) ||
                    defaultFoodImage,
                }}
                alt={formData?.foodName}
                className="w-48 h-48 m-4 rounded-full"
              />
            </HStack>
            <View className="flex flex-row justify-center items-center">
              {!nameField ? (
                <Text className="text-2xl font-bold">
                  {formData?.foodName || 'New Food'}
                </Text>
              ) : (
                <Input
                  className="w-1/2"
                  variant="rounded"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}>
                  <InputField
                    placeholder="Type Food Name"
                    value={formData.foodName}
                    onChangeText={text => {
                      handleInputChange('foodName', text);
                    }}
                    size="xl"
                    className="text-2xl font-bold"
                  />
                </Input>
              )}
              <TouchableOpacity
                className="ml-4"
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
            <Text className="text-green-500">
              {daysLeft}
              {/* {transformDays(daysLeft)} days left */}
            </Text>
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
            defaultOption={foodDetails?.storageTip}
          />
          <Text className="mt-5 text-gray-400 text-base font-normal self-start ml-4 mb-5">
            Recorded on {convertTimeStringToDate(formData?.createdAt)}
          </Text>
          <Text className="mt-5 text-gray-400 text-base font-normal self-start ml-4 mb-5">
            {formData.isFoodFromWiki
              ? 'Food is in our FoodWiki'
              : 'First time seeing this food in our wiki'}
          </Text>
        </VStack>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-4 py-4">
        <HStack className="item-center justify-between">
          <HStack space="lg" className="item-center">
            <Button
              disabled={formData?.quantity === 0}
              onPress={() => {
                setDisableButton(false);
                handleInputChange('quantity', formData?.quantity - 1);
              }}
              className="bg-orange-300 w-12 h-12 rounded-md">
              <ButtonText>-</ButtonText>
            </Button>
            <Text className="text-xl">{formData?.quantity}</Text>
            <Button
              onPress={() => {
                setDisableButton(false);
                handleInputChange('quantity', formData?.quantity + 1);
              }}
              className="bg-orange-300 w-12 h-12 rounded-md">
              <ButtonText>+</ButtonText>
            </Button>
          </HStack>
          <Button
            onPress={handleSave}
            className={`min-w-[150px] ${
              disableButton || handleDisable ? 'bg-gray-400' : 'bg-green-500'
            }`}
            isDisabled={disableButton || handleDisable}>
            <ButtonText>Finish</ButtonText>
          </Button>
        </HStack>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetailsEditModal;
