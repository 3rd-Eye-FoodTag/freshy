import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, Pressable, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from "native-base";
// import ShoppingListDeleteIcon from '../icons/ShoppingListDeleteIcon';

interface Props {
  data: { key: string, icon?: string }[];
  renderItem: ({ item }: { item: { key: string, icon?: string } }) => React.ReactNode;
  keyExtractor: (item: { key: string }) => string;
}

const ShoppingList: React.FC<Props> = ({ data, renderItem, keyExtractor }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [listData, setListData] = useState(data);

  const toggleCheckbox = (key: string) => {
    console.log({key, checkedItems , listData})
    setCheckedItems(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const renderCheckbox = (key: string) => {
    const checked = checkedItems[key] || false;

    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => toggleCheckbox(key)}>
        {checked && <Checkbox value="test" isChecked={checkedItems[key]}/>}
      </Pressable>
    );
  };

  const getListItemTextStyle = (key: string) => {
    return {
      ...styles.listItemText,
      color: checkedItems[key] ? 'lightgrey' : 'black'
    };
  };

  const handleDelete = (key: string) => {
    setListData(prevData => prevData.filter(item => item.key !== key));
  };

  const renderRightActions = (key: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(key)}>
      {/* <ShoppingListDeleteIcon color={'white'} /> */}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={listData}
      renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => toggleCheckbox(item.key)}>
            <Text style={[styles.listItemText, getListItemTextStyle(item.key)]}>
              {item.key}
            </Text>
            {renderCheckbox(item.key)}
          </TouchableOpacity>
      )}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 19,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211, 211, 211, 0.5)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: 'green',
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
});

export default ShoppingList;
