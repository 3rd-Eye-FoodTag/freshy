import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import FoodDetailsModal from '../../component/Modal/FoodDetailsModal';
import FoodDetailsEditModal from '../../component/Modal/FoodDetailsEditModal';
import { dummyFoodData } from '../../utils/constants'
import FoodItem from '../../component/FoodItem';

interface SliderIconProps {
  name: string;
  size?: number;
  color?: string;
}

const foodData = {
  name: 'Eggplant',
  imageUrl: 'https://example.com/your-image-url.jpg',
  daysLeft: 7,
  location: 'Fridge',
  expiryDate: '01/20/2024',
  reminder: '2 Days Before Exp',
  category: 'Vegetable',
  others: 'Other Category',
  storageTips: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const Storage: React.FC = () => {
  const [itemList, setItemList] = useState(dummyFoodData)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState("")

  const handleClickIcon = (item) => {
    console.log({ item })
    setSelectedFood(item)
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.arcContainer}>

        <View style={styles.arcBackground}></View>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Storage</Text>
          <TouchableOpacity style={styles.icon}>
          {/* <FontAwesome6 name="sliders" size={20} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View> 
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}><Text style={styles.tabTextActive}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Fridge</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Freezer</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Pantry</Text></TouchableOpacity>
      </View>      
      <TextInput style={styles.searchBar} placeholder="Search" />
      <FlatList
        data={itemList}
        numColumns={3}
        renderItem={({ item }) => 
          <FoodItem 
            item={item} 
            handleOnClick={() => { 
              handleClickIcon(item) 
            }}/>}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.itemsContainer}
      />
      <FoodDetailsEditModal visible={modalVisible} onClose={() => setModalVisible(false)} data={selectedFood} />  
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
    height: 150, // 矩形高度
  },
  arcBackground: {
    position: 'absolute',
    width: 2000,
    height: 2000, 
    backgroundColor: '#00A86B',
    borderBottomLeftRadius: 1200, // 圆形弧度
    borderBottomRightRadius: 1200, // 圆形弧度
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
});

export default Storage;