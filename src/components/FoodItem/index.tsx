import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, View, Text, Animated} from 'react-native';
import {Image} from '@/components/ui/image';
import {FoodDetailsProps} from '../../utils/interface';
import {defaultFoodImage, getImageURL} from '../../utils/constants';
import {
  calculateDaysDifference,
  convertToMMDDYYYY,
  transformDays,
} from '../../utils/utils';
import {useRemoveFoodItem} from '@/hooks/useHandleRemoveItem';

interface FoodItemProps {
  item: FoodDetailsProps;
  handleOnClick?: (e: any) => void;
  handlePressIn?: (e: any) => void;
  handlePressOut?: (e: any) => void;
  onHoldSet?: boolean;
}

const FoodItem: React.FC<FoodItemProps> = ({
  item,
  handleOnClick,
  onHoldSet = false,
  handlePressIn,
  handlePressOut,
}) => {
  const daysLeft = calculateDaysDifference(item?.expiryDate);
  const {mutate: removeFoodItem, isLoading} = useRemoveFoodItem(item.foodID);

  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  let statusColor = 'bg-green-500';
  let textColor = 'text-green-500';

  if (daysLeft < 3) {
    statusColor = 'bg-red-500';
    textColor = 'text-red-500';
  } else if (daysLeft <= 7) {
    statusColor = 'bg-orange-500';
    textColor = 'text-orange-500';
  }

  useEffect(() => {
    let wobble;

    if (onHoldSet) {
      wobble = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(rotateAnimation, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
              toValue: 1.01,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(rotateAnimation, {
              toValue: -1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
              toValue: 0.99,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(rotateAnimation, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      wobble.start();
    } else {
      // Reset animations to the original state
      rotateAnimation.setValue(0);
      scaleAnimation.setValue(1);
    }

    return () => {
      if (wobble) {
        wobble.stop();
      }
    };
  }, [onHoldSet, rotateAnimation, scaleAnimation]);

  const handleRemove = () => {
    removeFoodItem();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: rotateAnimation.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: ['-3deg', '0deg', '3deg'],
            }),
          },
          {scale: scaleAnimation},
        ],
      }}>
      <TouchableOpacity
        className="bg-gray-100 rounded-lg p-3 items-center justify-between h-42"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onBlur={() => console.log('hello')}
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
            className={`absolute top-0 left-0 w-6 h-6 rounded-full ${statusColor} flex items-center justify-center`}>
            <Text className="text-xs text-white font-bold">
              x{item.quantity}
            </Text>
          </View>
          {onHoldSet && (
            <TouchableOpacity
              className={
                'absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center'
              }
              onPress={handleRemove}>
              <Text className="text-xs text-white font-bold">x</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-center font-bold text-sm mt-2">
          {item.foodName}
        </Text>
        <Text className="text-gray-500 text-xs">
          {convertToMMDDYYYY(item?.createdAt)}
        </Text>
        <Text className={`text-center text-xs ${textColor}`}>
          {daysLeft < 0 ? 'expired' : `in ${transformDays(daysLeft)}`}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FoodItem;
