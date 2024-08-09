import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface SliderIconProps {
  name: string;
  size?: number;
  color?: string;
}

const data = [
  { key: 'Onion', quantity: 3, status: -3 },
  { key: 'Kiwi', quantity: 5, status: -2 },
  { key: 'Tofu', quantity: 1, status: -1 },
  { key: 'Carrot', quantity: 2, status: 0 },
  { key: 'Blueberry', quantity: 1, status: 1 },
  { key: 'Ground Beef', quantity: 1, status: 2 },
  { key: 'Potato', quantity: 3, status: 15 },
  { key: 'Egg', quantity: 8, status: 30 },
  { key: 'Green bean', quantity: 1, status: 60 },
  { key: 'Bread', quantity: 1, status: 90 },
  { key: 'Onion', quantity: 3, status: -3 },
  { key: 'Kiwi', quantity: 5, status: -2 },
  { key: 'Tofu', quantity: 1, status: -1 },
  { key: 'Carrot', quantity: 2, status: 0 },
  { key: 'Blueberry', quantity: 1, status: 1 },
  { key: 'Ground Beef', quantity: 1, status: 2 },
  { key: 'Potato', quantity: 3, status: 15 },
  { key: 'Egg', quantity: 8, status: 30 },
  { key: 'Green bean', quantity: 1, status: 60 },
  { key: 'Bread', quantity: 1, status: 90 },
];

const Storage: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      {/* 做了一个大圆形在背景的叠加形成的弧形效果，用了zindex和absolute定位 */}
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
        data={data}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemImageContainer}>
              {/* 假图片 */}
              <View style={styles.fakeImage}></View>
              <View style={[
                styles.itemQuantity, 
                { backgroundColor: item.status < 0 ? 'red' : item.status <= 2 ? 'orange' : 'rgb(81, 179, 125)' }
              ]}>
                <Text style={styles.itemQuantityText}>x{item.quantity}</Text>
              </View>
            </View>
            <Text style={styles.itemText}>{item.key}</Text>
            {item.status < 0 ? (
              <Text style={[styles.itemStatus, { color: 'red' }]}>expired</Text>
            ) : item.status <= 2 ? (
              <Text style={[styles.itemStatus, { color: 'orange' }]}>in {item.status} day{item.status > 1 ? 's' : ''}</Text>
            ) : (
              <View style={styles.progressBarContainer}>
                 <View style={[styles.progressBar, { width: `${(item.status / 90) * 100}%` }]} />
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.itemsContainer}
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
    height: 150, // 矩形高度
  },
  arcBackground: {
    position: 'absolute',
    width: 2000,
    height: 2000, 
    backgroundColor: 'lightgrey',
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
    backgroundColor: 'lightgrey', 
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