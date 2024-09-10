import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Image} from 'native-base';

interface FoodIconProps {
  name: string; // Name of the food
  url: string; // URL of the image
  selected?: boolean; // If the item is selected
  onClick?: () => void; // Function to handle click
}

const FoodIcon: React.FC<FoodIconProps> = ({name, url, selected, onClick}) => {
  return (
    <TouchableOpacity
      style={[styles.foodIconContainer, selected && styles.selectedItem]}
      onPress={onClick}>
      <Image
        source={{
          uri: url,
        }}
        alt={name}
        resizeMode="cover"
        style={styles.itemImage}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodIconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 5,
    width: 100, // Set the width of the container
    height: 120, // Set the height including text
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 80, // Set image width to be square
    height: 80, // Set image height to be square
    borderRadius: 10, // Keep border radius for rounded effect
    marginBottom: 5,
  },
  selectedItem: {
    backgroundColor: '#A9A9A9',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default FoodIcon;
