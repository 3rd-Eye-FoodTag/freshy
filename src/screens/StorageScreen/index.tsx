import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
// import FoodDetailsModal from '../../component/Modal/FoodDetailsModal';
import FoodDetailsModal from '../../component/Modal/FoodDetailsEditModal';
import FoodItem from '../../component/FoodItem';
import {FoodDetailsProps} from '../../utils/interface';
import ToggleButton from '../../component/ToggleButton';
import {useSelector} from 'react-redux';
import {currentUser} from '../../redux/reducer';
import {
  handleUpdateInventory,
  fetchInventoryDataFromeFirebase,
  postInventoryUpdateToFirebase,
  fetchFoodWikFromFirebase,
  postMockData,
  addFoodDataToFirestore,
} from '../../utils/api';
import {useQuery} from '@tanstack/react-query';
import {Button} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {dummyFoodData} from '../../utils/constants';
import SearchBar from '../../component/SearchBar';
//test
import foodWikeData from '../../utils/mockData/foodWikiData.json';
import foodInventoryData from '../../utils/mockData/foodInventoryData.json';

const Storage: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodDetailsProps | null>('');
  const currentUserUUID = useSelector(currentUser);

  const {data: userData, isSuccess} = useQuery({
    queryKey: ['userInventory', currentUserUUID],
    queryFn: () => fetchInventoryDataFromeFirebase(currentUserUUID),
  });

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
    queryFn: () => fetchFoodWikFromFirebase(),
  });

  console.log({isSuccess});

  useEffect(() => {
    // addFoodDataToFirestore(foodWikeData)
    // console.log({ foodInventoryData })
    // postInventoryUpdateToFirebase(currentUserUUID, foodInventoryData)
  }, []);

  console.log({userData: userData?.data[0]});

  useEffect(() => {
    if (isSuccess) {
      const {data} = userData;
      setItemList(() => data);
      setFilteredData(() => data);
    }
  }, [userData]);

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === 'All') {
      setFilteredData(itemList);
    } else {
      setFilteredData(
        itemList.filter(item => item.storagePlace === selectedOption),
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.arcContainer}>
        <View style={styles.arcBackground} />
        <View style={styles.header}>
          <Text style={styles.headerText}>My Storage</Text>
          <TouchableOpacity style={styles.icon} />
        </View>
      </View>
      {/* <Button mt={4} bg="#00A86B" _text={{ color: 'white' }}
        onPress={() => {
          setModalVisible(true)
          setSelectedFood(null)
      }}>
        Add New Inventory
      </Button> */}
      <ToggleButton
        options={['All', 'Fridge', 'Freezer', 'Pantry']}
        onSelect={handleSelect}
      />
      <SearchBar
        placeholder="Search"
        data={foodWikiData.map((item, index) => {
          if (item === undefined) {
            console.log({item});
          }
          // if(!item?.food) {
          //   console.log({ item })
          // }
          return (
            item && {
              id: item.foodID || index,
              name: item.food || 'undefined',
              ...item,
            }
          );
        })}
        onSelect={item => {
          // Handle item selection
        }}
      />
      {isSuccess && (
        <FlatList
          data={filteredData}
          numColumns={3}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <FoodItem
                item={item}
                handleOnClick={() => {
                  setSelectedFood(item);
                  setModalVisible(() => true);
                }}
              />
            </View>
          )}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.itemsContainer}
        />
      )}
      <FoodDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        foodDetails={selectedFood}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arcContainer: {
    position: 'relative',
    height: 150,
  },
  arcBackground: {
    position: 'absolute',
    width: 2000,
    height: 2000,
    backgroundColor: '#00A86B',
    borderBottomLeftRadius: 1200,
    borderBottomRightRadius: 1200,
    zIndex: 1,
    top: -1880,
    left: -790,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '8%',
    backgroundColor: '#00A86B',
    zIndex: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'PingFang SC',
  },
  icon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20,
  },
  tab: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
  },
  activeTab: {
    backgroundColor: '#00B578',
  },
  tabText: {
    color: 'black',
  },
  tabTextActive: {
    color: 'white',
  },
  searchBar: {
    margin: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    textAlign: 'center',
  },
  itemsContainer: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  itemImageContainer: {
    position: 'relative',
  },
  fakeImage: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
  },
  itemQuantity: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemQuantityText: {
    color: 'white',
    fontSize: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  itemStatus: {
    fontSize: 12,
    textAlign: 'center',
  },
  progressBarContainer: {
    marginTop: 5,
    width: 40,
    height: 6,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgb(81, 179, 125)',
  },
  itemContainer: {
    flex: 1 / 3, // Each item takes up 1/3rd of the row
    maxWidth: '33.33%', // Ensures no overflow
    margin: 5,
  },
});

export default Storage;
