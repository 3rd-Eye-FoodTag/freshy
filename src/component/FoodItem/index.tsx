import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FoodDetailsProps} from '../../utils/interface';
import {Image} from 'native-base';
import {getImageURL} from '../../utils/constants';
import {calculateDaysDifference, transformDays} from '../../utils/utils';

interface FoodItemProps {
  item: FoodDetailsProps;
  handleOnClick: (e: any) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({item, handleOnClick}) => {
  let daysLeft = calculateDaysDifference(item?.expiryDate);

  return (
    <TouchableOpacity style={styles.item} onPress={handleOnClick}>
      <View style={styles.itemImageContainer}>
        <Image
          source={{
            uri: getImageURL(item.imageName),
          }}
          alt={'item.food'}
          size="lg"
          borderRadius={10}
          resizeMode="cover"
          style={styles.image}
        />
        <View
          style={[
            styles.itemQuantity,
            {
              backgroundColor:
                item.quantity < 0
                  ? 'red'
                  : item.quantity <= 2
                  ? 'orange'
                  : 'rgb(81, 179, 125)',
            },
          ]}>
          <Text style={styles.itemQuantityText}>x{item.quantity}</Text>
        </View>
      </View>
      <Text style={styles.itemText}>{item.foodName}</Text>
      {daysLeft < 0 ? (
        <Text style={[styles.itemStatus, {color: 'red'}]}>expired</Text>
      ) : daysLeft <= 2 ? (
        <Text style={[styles.itemStatus, {color: 'orange'}]}>
          in {transformDays(daysLeft)}
        </Text>
      ) : (
        <Text style={[styles.itemStatus, {color: 'green'}]}>
          in {transformDays(daysLeft)}
        </Text>
        // <View style={styles.progressBarContainer}>
        //   <View
        //     style={[
        //       styles.progressBar,
        //       {width: `${Math.min((daysLeft / 14) * 100, 100)}%`},
        //     ]}
        //   />
        // </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150,
  },
  itemImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemQuantity: {
    position: 'absolute',
    top: -5,
    right: -5,
    padding: 5,
    borderRadius: 15,
  },
  itemQuantityText: {
    color: 'white',
    fontSize: 12,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemStatus: {
    textAlign: 'center',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 5,
    width: '100%',
    overflow: 'hidden', // ensures the progress bar doesn't overflow
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
});

export default FoodItem;
