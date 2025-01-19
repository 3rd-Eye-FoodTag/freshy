import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import FoodItem from '../../components/FoodItem';
import {useDispatch, useSelector} from 'react-redux';
import {currentUser} from '../../redux/reducer';
import {
  fetchInventoryDataFromeFirebase,
  addFoodDataToFirestore,
  addFoodItemsToFirebase,
} from '../../utils/api';
import {useQuery} from '@tanstack/react-query';
import SearchBar from '../../components/SearchBar';
import ToggleButton from '../../components/ToggleButton';
import {
  updateModalConstant,
  updateSelectedFoodDetails,
} from '../../redux/reducer/storageReducer';
import {modalConstants} from '../../components/Modal/constants';
import {sortFoodStartFromSpoil} from '@/utils/utils';
import foodWikiData3 from '../../utils/mockData/foodWikiData3.json';
import EyeOffIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui';
import {HStack, VStack} from 'native-base';
import {getFoodWikiFromFirebase, getUserInventoryList} from '@/utils/routes';

const Storage: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<any>([]);
  const [sortValue, setSortValue] = useState('All');
  const dispatch = useDispatch();
  const currentUserUUID = useSelector(currentUser);

  const [holding, setHolding] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const [showRemove, setShowRemove] = useState(false);

  const handlePressIn = () => {
    setHolding(true);
    holdTimer.current = setTimeout(() => {
      setHolding(false);
      setShowRemove(true);
      console.log('Held for 2 seconds, triggering action');
    }, 1500); // Set to 2 seconds
  };

  const options = [
    {label: 'All', value: 'All', type: 'status'},
    {label: 'L2H', value: 'L2H', type: 'status'},
    {label: 'H2L', value: 'H2L', type: 'status'},
    {label: 'Meat', value: 'Meat', type: 'category'},
    {label: 'Vegetable', value: 'Veg', type: 'category'},
    {label: 'Beverages', value: 'Beverages', type: 'category'},
  ];

  const handlePressOut = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setHolding(false);
  };

  const handleOutsidePress = () => setShowRemove(() => false);

  const {data: userData = [], isSuccess} = useQuery({
    queryKey: ['userInventory', currentUserUUID],
    queryFn: () => getUserInventoryList(currentUserUUID),
  });

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
    queryFn: () => getFoodWikiFromFirebase(),
  });

  useEffect(() => {
    // addFoodItemsToFirebase(foodWikiData3);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const {data} = userData;
      setInventoryData(data);
    }
  }, [userData]);

  const handleSelectChange = (selectSort: string) => {
    setInventoryData(() => {
      const {data} = userData;

      const food = sortFoodStartFromSpoil({
        foodGroup: data,
        sortMethod: selectSort,
      });
      return [...food];
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="relative h-24">
          <View className="absolute w-[2000px] h-[2000px] bg-green-700 -top-[1920px] -left-[790px] rounded-b-full z-10" />
          <View className="flex-row justify-center items-center py-2 bg-green-700 z-20">
            <Text className="text-lg font-medium text-white mt-5">
              My Storage
            </Text>
            <TouchableOpacity className="absolute right-5 z-20" />
          </View>
        </View>
        <VStack className="w-full px-4 my-4 pb-10">
          <VStack className="w-full mb-10 z-20">
            <HStack className="w-full z-20">
              <Select
                closeOnOverlayClick={true}
                onValueChange={handleSelectChange}
                defaultValue={options[0].value}>
                <SelectTrigger
                  variant="outline"
                  size="md"
                  className="flex justify-center items-center w-20 rounded-full bg-[#00A86B]">
                  <SelectInput className="text-center text-white w-full" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {options.map((item, index) => (
                      <SelectItem
                        label={item.label}
                        value={item.value}
                        key={`sort-option-${index}`}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
              <View className="flex-row w-full justify justify-evenly">
                <ToggleButton
                  options={['Expired', 'Expiring']}
                  onSelect={e => {
                    handleSelectChange(e);
                  }}
                  size="auto"
                />
              </View>
            </HStack>

            <SearchBar
              placeholder="Search"
              className="flex-1"
              data={inventoryData.map((item, index) => ({
                id: item.foodID || index,
                name: item.food || 'undefined',
                ...item,
              }))}
              onTextChange={searchFood => {
                const {data} = userData;
                const searchFoodList = sortFoodStartFromSpoil({
                  foodGroup: data,
                  searchFood: searchFood,
                });

                setInventoryData(searchFoodList);
              }}
              onSelect={item => {
                // Handle item selection
              }}
            />
          </VStack>

          {isSuccess && (
            <FlatList
              data={inventoryData}
              numColumns={3}
              keyExtractor={item => item.foodID}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10, paddingBottom: 30}}
              renderItem={({item, index}) => (
                <View
                  className="flex-1 max-w-[33.33%] pb-2"
                  style={index % 3 !== 2 ? {marginRight: 10} : {}}>
                  <FoodItem
                    item={item}
                    handlePressIn={handlePressIn}
                    handlePressOut={handlePressOut}
                    onHoldSet={showRemove}
                    handleOnClick={() => {
                      if (!showRemove) {
                        dispatch(updateSelectedFoodDetails(item));
                        dispatch(
                          updateModalConstant({
                            modalConstant: modalConstants.FOOD_DETAILS_MODAL,
                            modalProps: {
                              foodDetails: item,
                            },
                          }),
                        );
                      }
                    }}
                  />
                </View>
              )}
            />
          )}
        </VStack>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Storage;
