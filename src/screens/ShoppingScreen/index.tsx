import React, { useEffect } from 'react';
import { Box, HStack, Checkbox, FlatList, Center, Button, Text } from 'native-base';
import Header from '../../component/Header';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckbox, loadAndSetShoppingList } from '../../redux/reducer/shoppingSlice';

const ShoppingListScreen = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shopping.items);

  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadAndSetShoppingList());
    };
    loadItems();
  }, [dispatch]);

  const handleCheckboxChange = (foodName: string) => {
    dispatch(toggleCheckbox(foodName));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} bg="white" px={4} py={2}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Header />
        </HStack>
        <FlatList
          data={shoppingList}
          keyExtractor={item => item.foodName}
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
                {item.foodName}
              </Text>
              <Checkbox
                isChecked={item.isChecked}
                value={item.foodName}
                onChange={() => handleCheckboxChange(item.foodName)}
                size="md"
                aria-label={`Select ${item.foodName}`}
                _checked={{
                  bg: 'gray.500',
                  borderColor: 'gray.500',
                }}
              />
            </HStack>
          )}
        />
        <Center mt={4}>
          <Button
            w="90%"
            size="lg"
            bg="gray.300"
            _text={{ color: 'black', fontWeight: '500' }}
            onPress={() => console.log('Add to Inventory')}
            aria-label="Add to Inventory"
            style={{ marginBottom: 100, marginTop: 30 }}>
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
