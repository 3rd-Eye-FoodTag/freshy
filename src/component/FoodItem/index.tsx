import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FoodDetailsProps } from '../../utils/interface';

interface FoodItemProps {
  item: FoodDetailsProps;
  handleOnClick: (e) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ item , handleOnClick}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={handleOnClick}>
      <View style={styles.itemImageContainer}>
        {/* Replace with actual image component */}
        <View style={styles.fakeImage}></View>
        <View
          style={[
            styles.itemQuantity,
            { backgroundColor: item.quantity < 0 ? 'red' : item.quantity <= 2 ? 'orange' : 'rgb(81, 179, 125)' },
          ]}
        >
          <Text style={styles.itemQuantityText}>x{item.quantity}</Text>
        </View>
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
      {item.daysLeft < 0 ? (
        <Text style={[styles.itemStatus, { color: 'red' }]}>expired</Text>
      ) : item.daysLeft <= 2 ? (
        <Text style={[styles.itemStatus, { color: 'orange' }]}>
          in {item.daysLeft} day{item.daysLeft > 1 ? 's' : ''}
        </Text>
      ) : (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(item.daysLeft / 90) * 100}%` }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  itemImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 10,
  },
  fakeImage: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
  },
  itemQuantity: {
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 5,
    borderRadius: 15,
    color: 'white',
  },
  itemQuantityText: {
    color: 'white',
    fontSize: 12,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemStatus: {
    textAlign: 'center',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
});

export default FoodItem;
