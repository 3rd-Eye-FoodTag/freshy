import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Image} from '@/components/ui/image';
import {FoodDetailsProps} from '../../utils/interface';
import {defaultFoodImage, getImageURL} from '../../utils/constants';
import {
  calculateDaysDifference,
  convertToMMDDYYYY,
  transformDays,
} from '../../utils/utils';

interface FoodItemProps {
  item: FoodDetailsProps;
  handleOnClick: (e: any) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({item, handleOnClick}) => {
  const daysLeft = calculateDaysDifference(item?.expiryDate);
  const badgeColor =
    daysLeft < 3 ? 'red-500' : daysLeft <= 7 ? 'orange-400' : 'green-500';

  return (
    <TouchableOpacity
      className="flex-1 bg-gray-100 rounded-lg p-3 items-center justify-between h-42"
      onPress={handleOnClick}>
      <View className="relative w-24 h-24 items-center justify-center bg-gray-200 rounded-lg">
        <Image
          source={{
            uri: getImageURL(item.imageName) || defaultFoodImage,
          }}
          alt="item.food"
          className="w-full h-full rounded-lg"
          resizeMode="cover"
        />
        <View
          className={`absolute top-0 right-0 w-6 h-6 rounded-full bg-${badgeColor} flex items-center justify-center`}>
          <Text className="text-xs text-white font-bold">x{item.quantity}</Text>
        </View>
      </View>
      <Text className="text-center font-bold text-sm mt-2">
        {item.foodName}
      </Text>
      <Text className="text-gray-500 text-xs">
        {convertToMMDDYYYY(item?.createdAt)}
      </Text>
      <Text className={`text-center text-xs text-${badgeColor}`}>
        {daysLeft < 0 ? 'expired' : `in ${transformDays(daysLeft)}`}
      </Text>
    </TouchableOpacity>
  );
};

export default FoodItem;
