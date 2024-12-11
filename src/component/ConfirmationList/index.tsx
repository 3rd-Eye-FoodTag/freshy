import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import ItemDetailsRow from '../ItemDetailsRow';

interface ConfirmationListProps {
  confirmationList: any[];
  updateQuantity: (item: any, index: number) => void;
  onConfirmAll: () => void;
}

const ConfirmationList: React.FC<ConfirmationListProps> = ({
  confirmationList,
  updateQuantity,
  onConfirmAll,
}) => {
  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.header}>Confirm Adding to Inventory</Text>
      <FlatList
        data={confirmationList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 16}} // Adjust bottom padding if needed
        renderItem={({item, index}) => (
          <ItemDetailsRow
            onClick={updateQuantity}
            itemDetails={item}
            index={index}
          />
        )}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmAll}>
        <Text style={styles.confirmButtonText}>Confirm All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {padding: 20, borderRadius: 10, marginTop: 20},
  header: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {color: '#fff', textAlign: 'center', fontSize: 16},
});

export default ConfirmationList;
