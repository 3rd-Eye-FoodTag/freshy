import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import FoodItem from '@/components/FoodItem';
import {currentUser} from '@/redux/reducer';
import {sortFoodStartFromSpoil} from '@/utils/utils';

interface FoodItem {
  name: string;
  daysLeft: number;
}

interface Section {
  category: string;
  data?: FoodItem[];
}

const initialData: Section[] = [
  {category: 'Dessert'},
  {category: 'Carbs'},
  {category: 'Dessert'},
  {category: 'Protein'},
  {category: 'Fruit'},
  {category: 'Fruit'},
  {category: 'Fruits'},
];

const SectionComponent: React.FC<{section: Section; drag?: () => void}> = ({
  section,
  drag,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [foodData, setFoodData] = useState<any>([]);
  const currentUserUUID = useSelector(currentUser);

  const {data: userData = []} = useQuery({
    queryKey: ['userInventory', currentUserUUID],
  });

  useEffect(() => {
    if (userData && userData?.data) {
      setFoodData(() => {
        const filteredCollection = userData.data.filter(
          (item: {category: string}) => item.category === section.category,
        );

        return sortFoodStartFromSpoil(filteredCollection, -1);
      });
    }
  }, [userData, section.category]);

  return (
    foodData?.length > 0 && (
      <View className="mb-4 p-4 flex-1">
        <View
          className="flex flex-row justify-between items-center"
          onTouchStart={drag}>
          <Text className="text-lg font-bold text-gray-800">
            {section.category}
          </Text>
          <Text className="text-gray-400">≡</Text>
        </View>
        <ScrollView
          horizontal
          className="mt-2"
          showsHorizontalScrollIndicator={false}
          onTouchStart={() => setIsScrolling(true)} // Block DraggableFlatList drag
          onTouchEnd={() => setIsScrolling(false)} // Re-enable DraggableFlatList drag
          onScrollEndDrag={() => setIsScrolling(false)} // Extra safeguard
        >
          {foodData.map((item, index) => (
            <View className="flex-1 max-w-1/3 m-1" key={index}>
              <FoodItem item={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  );
};

const WhatToEatScreen: React.FC = () => {
  const [data, setData] = useState(initialData);

  const renderSection = ({item, drag, isActive}: RenderItemParams<Section>) => (
    <View
      className={`mb-4 rounded-lg ${
        isActive ? 'bg-gray-200' : 'bg-white'
      } shadow-md`}>
      <SectionComponent section={item} drag={drag} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6 h-full">
      <DraggableFlatList
        data={data}
        renderItem={renderSection}
        keyExtractor={(item, index) => `${item.category}-${index}`} // Unique key extractor
        onDragEnd={({data}) => setData(data)}
        ListFooterComponent={<View className={'h-screen bg-transparent'} />}
      />
    </SafeAreaView>
  );
};

export default WhatToEatScreen;
