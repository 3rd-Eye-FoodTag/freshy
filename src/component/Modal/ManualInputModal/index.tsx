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
import {useQuery} from '@tanstack/react-query';

import {getImageURL} from '../../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmationList from '../../ConfirmationList';
import {confirmationListSelector} from '../../../redux/reducer/storageReducer';
import useHandleAddItem from '../../../hooks/useHandleAddItem';

const ManualInputModal: React.FC<{showConfirmation: boolean}> = ({
  showConfirmation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [recommendedList, setRecommendedList] = useState<any>([]);
  const confirmationList = useSelector(confirmationListSelector);
  const dispatch = useDispatch();

  const {addFoodToInventory, addFoodItemToConfirmationList, updateQuantity} =
    useHandleAddItem();

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
  });

  useEffect(() => {
    setRecommendedList(foodWikiData);
    if (showConfirmation) {
      setConfirmationVisible(true);
    }
  }, [dispatch, foodWikiData, showConfirmation]);

  const handleAddItem = (item: any) => {
    addFoodItemToConfirmationList(item);
    setConfirmationVisible(true);
  };

  const handleConfirmationAll = () => {
    addFoodToInventory();
    setConfirmationVisible(false);
  };

  const filteredItems = recommendedList.filter(item => {
    return (
      item.type === 'Fruit' &&
      item?.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <View style={styles.modalContent}>
      {!isConfirmationVisible ? (
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
            keyExtractor={(item, index) => `${item.id?.toString()} + ${index}`}
            renderItem={({item}) => (
              <FoodIcon
                name={item.foodName}
                url={getImageURL(item.imageName)}
                selected={item.selected}
                onClick={() => handleAddItem(item)}
              />
            )}
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
        </View>
      ) : (
        <ConfirmationList
          confirmationList={confirmationList}
          updateQuantity={updateQuantity}
          onConfirmAll={handleConfirmationAll}
        />
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
