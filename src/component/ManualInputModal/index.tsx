// ManualInputModal.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import FoodIcon from '../FoodIcon';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {getImageURL} from '../../utils/constants';
import {FoodDetailsProps} from '../../utils/interface';
import _filter from 'lodash/filter';
import {calculateExpirationDate} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {currentUser} from '../../redux/reducer';
import {postInventoryUpdateToFirebase} from '../../utils/api';
import ItemDetailsRow from '../ItemDetailsRow';

const ManualInputModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0)); // Animation for sliding up
  const [recommendedList, setRecommendedList] = useState<any>([]);
  const currentUserUUID = useSelector(currentUser);

  const queryClient = useQueryClient();

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
  });

  useEffect(() => {
    setRecommendedList(foodWikiData);
  }, [foodWikiData]);

  const handleShowModal = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle hiding the modal with animation
  const handleHideModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());

    setRecommendedList(pre => [
      ...pre.map(item => {
        return {...item, selected: false};
      }),
    ]);

    setSelectedItems([]);
  };

  // Function to handle adding selected items to the confirmation list
  const handleAddItem = () => {
    setConfirmationVisible(true);

    //will comment out this part when we select mutliple items

    // if (selectedItems.length > 0) {
    //   setConfirmationVisible(true);
    // }
  };

  // Function to handle updating the quantity of items
  const updateQuantity = (listIndex: number, change: number) => {
    setSelectedItems(prevItems =>
      prevItems.map((item, index) =>
        index === listIndex
          ? {...item, quantity: Math.max((item.quantity || 0) + change, 0)} // Ensure quantity does not go below 0
          : item,
      ),
    );
  };

  const updateStoragePlace = (selectedPlace: string) => {
    setSelectedItems(prevItems =>
      prevItems.map(item => {
        return {...item, storagePlace: selectedPlace};
      }),
    );
  };

  const handleStoragePlacedChanged = (storagePlace: string) => {
    updateStoragePlace(storagePlace);
  };

  // Function to select an item from the list
  const selectItem = (selectedFood: FoodDetailsProps) => {
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

    setRecommendedList(pre => [
      ...pre.map(item => {
        if (item.foodID === selectedFood.foodID) {
          return {...item, selected: !item?.selected};
        }
        return item;
      }),
    ]);
  };

  const postData = async (input: any) => {
    const {userId, data} = input;
    return await postInventoryUpdateToFirebase(userId, data);
  };

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInventory']});
    },
  });

  const todayDate = new Date();

  const handleConfirmationAll = () => {
    const submittedFood = selectedItems.map(item => {
      return {
        name: item.food,
        quantity: item.quantity,
        purchaseDate: todayDate.toString(),
        expiryDate: calculateExpirationDate(item?.predictedFreshDurations.room),
        predictedFreshDurations: item?.predictedFreshDurations,
        consumed: false,
        category: item.type,
        share: true,
        createdBy: todayDate.toString(),
        freshnessScore: 100,
        storagePlace: item.storagePlace || 'Fridge',
        cost: 0,
        groceryStore: '',
        updatedByUser: currentUserUUID,
        consumedAt: '',
        foodPhoto: item?.imageName,
        createdAt: todayDate.toString(),
        updatedAt: todayDate.toString(),
        // id: crypto.randomUUID(),
      };
    });

    mutation.mutate({userId: currentUserUUID, data: [...submittedFood]});

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
      item?.food?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onShow={handleShowModal}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}>
          {!isConfirmationVisible && (
            <View>
              <View style={styles.header}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for an item"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <TouchableOpacity
                  onPress={handleHideModal}
                  style={styles.closeIcon}>
                  <Text style={styles.closeIconText}>X</Text>
                </TouchableOpacity>
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
                      name={item.food}
                      url={getImageURL(item.imageName)}
                      selected={item.selected}
                      onClick={() => {
                        selectItem(item);
                        handleAddItem();
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
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddItem}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {isConfirmationVisible && (
            <View style={styles.confirmationContainer}>
              <Text style={styles.header}>Confirm Adding to Inventory</Text>
              <FlatList
                data={selectedItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <ItemDetailsRow
                    onClick={updateQuantity}
                    itemDetails={item}
                    index={index}
                    handleStoragePlacedChanged={handleStoragePlacedChanged}
                  />
                )}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmationAll}>
                <Text style={styles.confirmButtonText}>Confirm All</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
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
});

export default ManualInputModal;
