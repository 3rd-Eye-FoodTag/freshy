import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  calculateExpirationDate,
  convertTimeStringToDate,
} from '../../utils/utils';

const ItemDetailsRow: React.FC<{
  itemDetails: any;
  onClick: (a: number, b: number) => void;
  index: number;
  handleStoragePlacedChanged: (input) => void;
}> = ({itemDetails, onClick, index, handleStoragePlacedChanged}) => {
  const {food, quantity, predictedFreshDurations} = itemDetails;
  const [storePlace, setStorePlace] = useState('Fridge');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const expiryDate = calculateExpirationDate(predictedFreshDurations.room);

  // Function to handle selecting a storage place
  const handleSelectPlace = (place: string) => {
    setStorePlace(() => place);
    setDropdownVisible(false);
    handleStoragePlacedChanged(place);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>{food}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => onClick(index, -1)}
            disabled={quantity < 1}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity || 0}</Text>
          <TouchableOpacity onPress={() => onClick(index, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemRow}>
        <Text>Expiry Date</Text>
        {/* Custom Selector Button */}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setDropdownVisible(true)}>
          <Text style={styles.selectorText}>{storePlace}</Text>
        </TouchableOpacity>
        <Text>{convertTimeStringToDate(expiryDate)}</Text>
      </View>

      {/* Modal for Dropdown */}
      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => handleSelectPlace('Pantry')}
              style={styles.dropdownItem}>
              <Text>Pantry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectPlace('Fridge')}
              style={styles.dropdownItem}>
              <Text>Fridge</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectPlace('Freezer')}
              style={styles.dropdownItem}>
              <Text>Freeze</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    textAlign: 'center',
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
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectorText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 150,
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 10,
    alignItems: 'center',
  },
});

export default ItemDetailsRow;
