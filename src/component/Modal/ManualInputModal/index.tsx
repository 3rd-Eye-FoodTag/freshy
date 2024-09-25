// ManualInputModal.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import FoodIcon from '../../FoodIcon';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {getImageURL} from '../../../utils/constants';
import _filter from 'lodash/filter';
import {calculateExpirationDate} from '../../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {currentUser} from '../../../redux/reducer';
import {postInventoryUpdateToFirebase} from '../../../utils/api';
import ItemDetailsRow from '../../ItemDetailsRow';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  addFoodItemToConfirmationList,
  confirmationListSelector,
  resetConfirmationList,
  updateConfirmationList,
  updateModalConstant,
} from '../../../redux/reducer/storageReducer';

const ManualInputModal: React.FC<{showConfirmation: boolean}> = ({
  showConfirmation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [recommendedList, setRecommendedList] = useState<any>([]);
  const currentUserUUID = useSelector(currentUser);
  const todayDate = new Date();
  const confirmationList = useSelector(confirmationListSelector);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
  });

  useEffect(() => {
    setRecommendedList(foodWikiData);
    if (showConfirmation) {
      setConfirmationVisible(true);
    }
  }, [foodWikiData, showConfirmation]);

  // Function to handle hiding the modal with animation
  const handleHideModal = () => {
    setRecommendedList(pre => [
      ...pre.map(item => {
        return {...item, selected: false};
      }),
    ]);

    setSelectedItems([]);
    dispatch(updateModalConstant({modalConstant: ''}));
  };

  // Function to handle adding selected items to the confirmation list
  const handleAddItem = item => {
    dispatch(addFoodItemToConfirmationList(item));
    setConfirmationVisible(true);

    //will comment out this part when we select mutliple items

    // if (selectedItems.length > 0) {
    //   setConfirmationVisible(true);
    // }
  };

  // Function to handle updating the quantity of items
  const updateQuantity = (listIndex: number, change: number) => {
    const newData = confirmationList.find(item => item.foodID === listIndex);
    dispatch(
      updateConfirmationList({
        ...newData,
        quantity: Math.max((newData.quantity || 0) + change, 0),
      }),
    );
  };

  // Function to select an item from the list
  const handleAddFoodToList = (selectedFood: any) => {
    const isSelectedFood = selectedItems.some(item => {
      return item.foodID === selectedFood.foodID;
    });
    if (!isSelectedFood) {
      setSelectedItems(pre => [...pre, {...selectedFood, selected: true}]);
    } else {
      setSelectedItems(pre => {
        return [
          ..._filter(pre, item => {
            return item.foodID !== selectedFood.foodID;
          }),
        ];
      });
    }

    const item = {...selectedFood};

    const formattedItem = {
      foodID: uuidv4(),
      foodName: item.foodName,
      quantity: item.quantity || 1,
      category: item.category,
      predictedFreshDurations: item?.predictedFreshDurations,
      consumed: false,
      share: true,
      freshnessScore: 100,
      storagePlace: item?.storagePlace || 'Fridge',
      cost: 0,
      groceryStore: '',
      imageName: item?.imageName,
      consumedAt: '',
      updatedByUser: currentUserUUID,
      createdBy: todayDate.toString(),
      purchaseDate: todayDate.toString(),
      createdAt: todayDate.toString(),
      updatedAt: todayDate.toString(),
      //going to add recommendated storagePlace
      foodWikiID: item?.foodWikiID,
      alternativeNames: item?.alternativeNames,
      expiryDate: calculateExpirationDate(item?.predictedFreshDurations.fridge),
      storageTip: item?.comment,
    };

    handleAddItem(formattedItem);
  };

  const addFoodItem = useMutation({
    mutationFn: async (postPayload: any) => {
      const {userId, data} = postPayload;
      return await postInventoryUpdateToFirebase(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInventory']});
    },
  });

  const handleConfirmationAll = () => {
    addFoodItem.mutate({userId: currentUserUUID, data: [...confirmationList]});
    dispatch(resetConfirmationList(''));

    setConfirmationVisible(false);
    handleHideModal();
  };

  // Filtered items based on search input
  const filteredItems = recommendedList.filter(item => {
    if (!item.id) {
      // console.log('null------', item);
    }
    return (
      item.type === 'Fruit' &&
      item?.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <View style={styles.modalContent}>
      {!isConfirmationVisible && (
        <View>
          <View style={styles.header}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for an item"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          <FlatList
            style={styles.recommendationContainer}
            data={filteredItems}
            numColumns={3}
            keyExtractor={(item, index) => {
              return `${item.id?.toString()} + ${index}`;
            }}
            renderItem={({item}) => {
              return (
                <FoodIcon
                  name={item.foodName}
                  url={getImageURL(item.imageName)}
                  selected={item.selected}
                  onClick={() => {
                    handleAddFoodToList(item);
                  }}
                />
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyComponent}>
                <Text style={styles.noItemText}>Cannot find the item.</Text>
                <TouchableOpacity>
                  <Text style={styles.createNewItemText}>
                    Create a new item
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
          {selectedItems.length > 0 && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {isConfirmationVisible && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.header}>Confirm Adding to Inventory</Text>
          <FlatList
            data={[...confirmationList]}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 16}} // Adjust bottom padding if needed
            renderItem={({item, index}) => {
              return (
                <ItemDetailsRow
                  onClick={updateQuantity}
                  itemDetails={item}
                  index={index}
                />
              );
            }}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmationAll}>
            <Text style={styles.confirmButtonText}>Confirm All</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },
  closeIcon: {marginLeft: 10},
  closeIconText: {fontSize: 18, color: 'red'},
  sectionTitle: {fontSize: 16, marginVertical: 10, fontWeight: 'bold'},
  suggestionItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 5,
  },
  popularItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 5,
    width: '30%',
    alignItems: 'center',
    padding: 10,
  },
  selectedItem: {backgroundColor: '#e0e0e0'},
  itemImage: {width: 50, height: 50, borderRadius: 5, marginBottom: 5},
  itemText: {fontSize: 14, textAlign: 'center'},
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {color: '#fff', textAlign: 'center', fontSize: 16},
  confirmationContainer: {padding: 20, borderRadius: 10, marginTop: 20},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    textAlign: 'center',
    width: 30,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {color: '#fff', textAlign: 'center', fontSize: 16},
  emptyComponent: {alignItems: 'center', marginTop: 20},
  noItemText: {color: '#555', textAlign: 'center'},
  createNewItemText: {color: '#007BFF', textAlign: 'center', marginTop: 5},
  recommendationContainer: {
    height: 500,
  },
  container: {
    flexDirection: 'column',
    paddingVertical: 4, // Reduce vertical padding
  },
  iconRightButton: {
    paddingRight: 5,
    backgroundColor: 'white',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ManualInputModal;
