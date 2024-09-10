import React, {useState} from 'react';
import {
  Box,
  HStack,
  VStack,
  Checkbox,
  IconButton,
  Icon,
  Text,
  FlatList,
  Center,
  Heading,
  Button,
} from 'native-base';

import Header from '../../component/Header';
import {SafeAreaView, StyleSheet} from 'react-native';

type Item = {
  id: string;
  name: string;
  icon: string;
  isChecked: boolean;
};

const initialData: Item[] = [
  {id: '1', name: 'Milk', icon: 'local-drink', isChecked: false},
  {id: '2', name: 'Egg', icon: 'egg', isChecked: false},
  {id: '3', name: 'Garlic', icon: 'restaurant', isChecked: false},
  {id: '4', name: 'Lettuce', icon: 'grass', isChecked: false},
  {id: '5', name: 'XXX Tofu', icon: 'fastfood', isChecked: false},
];

const ShoppingListScreen = () => {
  const [data, setData] = useState(initialData);

  const handleCheckboxChange = (id: string) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, isChecked: !item.isChecked} : item,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} bg="white" px={4} py={2}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Header />
        </HStack>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              p={3}
              borderBottomWidth={1}
              borderColor="gray.200">
              <HStack alignItems="center">
                <Text
                  strikeThrough={item.isChecked}
                  color={item.isChecked ? 'gray.400' : 'black'}
                  fontSize="md">
                  {item.name}
                </Text>
              </HStack>
              <Checkbox
                isChecked={item.isChecked}
                value={item.name}
                onChange={() => handleCheckboxChange(item.id)}
                size="md"
                _checked={{
                  bg: 'gray.500',
                  borderColor: 'gray.500',
                }}
                aria-label={item.name}
              />
            </HStack>
          )}
        />
        <Center mt={4}>
          <Button
            w="90%"
            size="lg"
            bg="gray.300"
            _text={{color: 'black', fontWeight: '500'}}
            onPress={() => console.log('Add to Inventory')}
            style={{marginBottom: 100, marginTop: 30}}>
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
