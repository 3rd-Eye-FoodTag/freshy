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
  fetchFoodWikFromFirebase,
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
import {LayoutAnimation} from 'react-native';

const Storage: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [storeMethod, setStoreMethod] = useState('All');

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
    queryFn: () => fetchInventoryDataFromeFirebase(currentUserUUID),
  });

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
    queryFn: () => fetchFoodWikFromFirebase(),
  });

  useEffect(() => {
    // addFoodItemsToFirebase(foodWikiData3);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const {data} = userData;
      setItemList(data);
      setFilteredData(data);

      if (
        storeMethod === 'Fridge' ||
        storeMethod === 'Freezer' ||
        storeMethod === 'Pantry'
      ) {
        setFilteredData(data.filter(item => item.storagePlace === storeMethod));
      }
    }
  }, [userData]);

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === 'All') {
      setFilteredData(itemList);
    } else {
      setFilteredData(
        itemList.filter(item => item.storagePlace === selectedOption),
      );
    }
    setStoreMethod(selectedOption);
  };

  const handleLayout = event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    console.log('Layout Info:', {x, y, width, height});
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
        <ToggleButton
          options={['All', 'Fridge', 'Freezer', 'Pantry']}
          onSelect={handleSelect}
        />
        <SearchBar
          placeholder="Search"
          data={foodWikiData.map((item, index) => ({
            id: item.foodID || index,
            name: item.food || 'undefined',
            ...item,
          }))}
          onSelect={item => {
            // Handle item selection
          }}
        />
        {isSuccess && (
          <FlatList
            data={sortFoodStartFromSpoil(filteredData)}
            numColumns={3}
            onLayout={handleLayout}
            renderItem={({item}) => (
              <View className="flex-1 max-w-[33.33%] m-1">
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
            keyExtractor={item => item.foodID}
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Storage;
