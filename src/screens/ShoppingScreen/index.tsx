import React, { useState, useEffect } from 'react';
import { Box, HStack, Checkbox, FlatList, Center, Button, Text } from 'native-base';
import Header from '../../component/Header';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckbox } from '../../redux/reducer/shoppingSlice';
import { addFoodItemToConfirmationList } from '../../redux/reducer/storageReducer';
import shoppingListData from '../../utils/mockData/shoppingListData.json';

const ShoppingListScreen = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector((state) => state.shopping.items);
  const confirmFoodList = useSelector((state) => state.inventory.confirmFoodList);

  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState(shoppingListData);

  const handleCheckboxChange = (name: string) => {
    const selectedItem = allItems.find(item => item.name === name);
    dispatch(toggleCheckbox(name));

    setSelectedItems((prevSelected) => {
      const isAlreadySelected = prevSelected.some(item => item.name === name);
      if (isAlreadySelected) {
        return prevSelected.filter(item => item.name !== name);
      } else {
        return [...prevSelected, selectedItem];
      }
    });
  };

  useEffect(() => {
    console.log('Shopping List Selected Items:', selectedItems);
  }, [selectedItems]);

  const handleAddToInventory = () => {
    selectedItems.forEach((item) => {
      dispatch(addFoodItemToConfirmationList(item)); // Dispatch each selected item
    });
    console.log('Updated Confirm Food List:', confirmFoodList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} bg="white" px={4} py={2}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Header />
        </HStack>
        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              p={3}
              borderBottomWidth={1}
              borderColor="gray.200">
              <Text
                strikeThrough={item.isChecked}
                color={item.isChecked ? 'gray.400' : 'black'}
                fontSize="md">
                {item.name}
              </Text>
              <Checkbox
                isChecked={item.isChecked}
                value={item.name}
                onChange={() => handleCheckboxChange(item.name)}
                size="md"
                _checked={{
                  bg: 'gray.500',
                  borderColor: 'gray.500',
                }}
                accessibilityLabel={`Select ${item.name}`}
              />
            </HStack>
          )}
        />
        <Center mt={4}>
          <Button
            w="90%"
            size="lg"
            bg={selectedItems.length > 0 ? "#00B578" : "gray.300"}
            _text={{ color: selectedItems.length > 0 ? 'white' : 'black', fontWeight: '500' }}
            onPress={handleAddToInventory}
            isDisabled={selectedItems.length === 0}
            style={{ marginBottom: 100, marginTop: 30 }}
            accessibilityLabel="Add items to inventory"
          >
            Add to Inventory
          </Button>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
