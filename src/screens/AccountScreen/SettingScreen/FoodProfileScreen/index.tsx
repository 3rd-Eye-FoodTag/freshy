import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Item {
  id: string;
  title: string;
  subItems?: Item[];
}

const initialData: Item[] = [
  {id: '1', title: 'Storage'},
  {id: '2', title: 'Expiry Date'},
  {id: '3', title: 'Reminder'},
  {id: '4', title: 'Category'},
  {id: '5', title: 'Others'},
  {id: '5.1', title: 'AAA'},
  {id: '5.2', title: 'BBB'},
  {id: '6', title: 'Storage Tips'},
];

const moreInfoData: Item[] = [
  {id: '7', title: 'Meal'},
  {id: '8', title: 'Cost'},
  {id: '9', title: 'Purchase from'},
  {id: '10', title: 'Production Date'},
];

const FoodProfileScreen: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [moreInfo, setMoreInfo] = useState(moreInfoData);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => (
    <View
      style={[
        styles.item,
        isActive && styles.activeItem,
        item.id.startsWith('5.') && styles.subItem,
      ]}>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <View style={styles.removeButtonContainer}>
          <Text style={styles.removeButton}>-</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onLongPress={drag}>
        <Text style={styles.dragHandle}>≡</Text>
      </TouchableOpacity>
    </View>
  );

  const removeItem = (id: string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
    setMoreInfo(prevMoreInfo => prevMoreInfo.filter(item => item.id !== id));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionHeader}>Included information</Text>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onDragEnd={({data}) => setData(data)}
        />
        <View style={styles.spacer} />
        <Text style={styles.sectionHeader}>More information</Text>
        <DraggableFlatList
          data={moreInfo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onDragEnd={({data}) => setMoreInfo(data)}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  spacer: {
    height: 100,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    fontSize: 14,
    color: 'grey',
    paddingLeft: 15,
    fontFamily: 'PingFang SC',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    marginBottom: 3,
    borderRadius: 5,
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
  subItem: {
    width: '70%',
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 25,
    marginRight: 22,
  },
  removeButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  removeButton: {
    fontSize: 20,
    color: 'black',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'PingFang SC',
  },
  dragHandle: {
    fontSize: 20,
    color: 'grey',
  },
});

export default FoodProfileScreen;
