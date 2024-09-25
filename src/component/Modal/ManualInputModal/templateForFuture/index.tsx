// ManualInputModal.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  Image,
  Animated,
} from 'react-native';

// Dummy data to simulate database items
const databaseItems = [
  {id: 1, name: 'Milk', image: 'https://via.placeholder.com/50'},
  {id: 2, name: 'Onion', image: 'https://via.placeholder.com/50'},
  {id: 3, name: 'Tofu', image: 'https://via.placeholder.com/50'},
  {id: 4, name: 'Egg', image: 'https://via.placeholder.com/50'},
  {id: 5, name: 'Bread', image: 'https://via.placeholder.com/50'},
  {id: 6, name: 'Chicken', image: 'https://via.placeholder.com/50'},
  {id: 7, name: 'Broccoli', image: 'https://via.placeholder.com/50'},
  {id: 8, name: 'Strawberry', image: 'https://via.placeholder.com/50'},
];

const ManualInputModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<
    {id: number; name: string; quantity: number; expiryDate: string}[]
  >([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0)); // Animation for sliding up

  // Function to handle showing the modal with animation
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
  };

  // Function to handle adding selected items to the confirmation list
  const handleAddItem = () => {
    if (selectedItems.length > 0) {
      setConfirmationVisible(true);
    }
  };

  // Function to handle updating the quantity of items
  const updateQuantity = (index: number, change: number) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity += change;
    setSelectedItems(updatedItems);
  };

  // Function to select an item from the list
  const selectItem = (item: {id: number; name: string}) => {
    if (!selectedItems.some(selected => selected.id === item.id)) {
      setSelectedItems([
        ...selectedItems,
        {...item, quantity: 1, expiryDate: ''},
      ]);
    }
  };

  // Filtered items based on search input
  const filteredItems = databaseItems.filter(item =>
    item.foodName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onShow={handleShowModal}>
      <View style={styles.modalOverlay}>
        {/* Bottom Sheet */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0], // Slide up from the bottom
                  }),
                },
              ],
            },
          ]}>
          {/* Search and Selection Screen */}
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

              <Text style={styles.sectionTitle}>
                Suggestions from grocery list
              </Text>
              <FlatList
                data={filteredItems.slice(0, 3)} // Show only a few suggestions
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.suggestionItem,
                      selectedItems.some(i => i.id === item.id) &&
                        styles.selectedItem,
                    ]}
                    onPress={() => selectItem(item)}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.itemImage}
                      alt={item.image}
                    />
                    <Text style={styles.itemText}>{item.foodName}</Text>
                  </TouchableOpacity>
                )}
              />

              <Text style={styles.sectionTitle}>Popular</Text>
              <FlatList
                data={filteredItems}
                numColumns={3}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.popularItem,
                      selectedItems.some(i => i.id === item.id) &&
                        styles.selectedItem,
                    ]}
                    onPress={() => selectItem(item)}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.itemImage}
                      alt={item.image}
                    />
                    <Text style={styles.itemText}>{item.foodName}</Text>
                  </TouchableOpacity>
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

              {selectedItems.length > 0 && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddItem}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Confirmation Screen */}
          {isConfirmationVisible && (
            <View style={styles.confirmationContainer}>
              <Text style={styles.header}>Confirm Adding to Inventory</Text>
              <FlatList
                data={selectedItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.foodName}</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(index, -1)}
                        disabled={item.quantity <= 1}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(index, 1)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setConfirmationVisible(false);
                  handleHideModal();
                }}>
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
  itemName: {fontSize: 16},
  quantityControls: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {padding: 10, fontSize: 18},
  quantityText: {marginHorizontal: 10},
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
});

export default ManualInputModal;
