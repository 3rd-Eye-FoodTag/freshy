import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

interface FoodItem {
  name: string;
  daysLeft: number;
}

interface Section {
  title: string;
  data: FoodItem[];
}

const initialData: Section[] = [
  {
    title: 'Carbs',
    data: [
      { name: 'Bread', daysLeft: 0 },
      { name: 'Bagel', daysLeft: 1 },
    ],
  },
  {
    title: 'Protein',
    data: [
      { name: 'Egg', daysLeft: 0 },
      { name: 'Ham', daysLeft: 1 },
    ],
  },
  {
    title: 'Vegetables & Fruits',
    data: [
      { name: 'Lettuce', daysLeft: 1 },
      { name: 'Strawberry', daysLeft: 2 },
      { name: 'Blueberry', daysLeft: 3 },
    ],
  },
  {
    title: 'Drinks',
    data: [{ name: 'Milk', daysLeft: 0 }],
  },
];

const SectionComponent: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{section.title}</Text><Text style={styles.dragHandleText}>≡</Text>
      <View style={styles.itemsContainer}>
        {section.data.map((item) => (
          <View key={item.name} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDaysLeft}>in {item.daysLeft} day{item.daysLeft !== 1 ? 's' : ''}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const WhatToEatScreen: React.FC = () => {
  const [data, setData] = useState(initialData);

  const renderSection = ({ item, drag, isActive }: RenderItemParams<Section>) => {
    return (
      <View
        style={[
          styles.sectionWrapper,
          { backgroundColor: isActive ? '#f0f0f0' : '#fff' },
        ]}
      >
        <View
          style={styles.dragHandle}
          onTouchStart={drag}
        >
          <Text style={styles.dragHandleText}>≡</Text>
        </View>
        <SectionComponent section={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        onDragEnd={({ data }) => setData(data)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  sectionWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
  },
  dragHandle: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandleText: {
    fontSize: 20,
    color: '#888',
  },
  sectionContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemDaysLeft: {
    fontSize: 12,
    color: '#888',
  },
});

export default WhatToEatScreen;
