import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  calculateDaysDifference,
  convertTimeStringToDate,
} from '../../utils/utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  updateModalConstant,
  updateSelectedFoodDetails,
} from '../../redux/reducer/storageReducer';
import {modalConstants} from '../Modal/constants';

const ItemDetailsRow: React.FC<{
  itemDetails: any;
  onClick: (a: number, b: number) => void;
  index: number;
}> = ({itemDetails, onClick, index}) => {
  const {foodName, quantity, expiryDate, storagePlace, foodID} = itemDetails;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>
          <TouchableOpacity
            style={styles.iconRightButton}
            onPress={() => {
              dispatch(updateSelectedFoodDetails({...itemDetails}));
              dispatch(
                updateModalConstant({
                  modalConstant: modalConstants.FOOD_DETAILS_MODAL,
                  modalProps: {
                    foodDetails: {
                      ...itemDetails,
                    },
                    isNewItem: true,
                  },
                }),
              );
            }}>
            <Icon
              as={FontAwesome5}
              name={'pencil-alt'}
              size="sm"
              color={'black'}
            />
          </TouchableOpacity>
          {foodName}
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => onClick(foodID, -1)}
            disabled={quantity < 1}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity || 0}</Text>
          <TouchableOpacity onPress={() => onClick(foodID, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemRow}>
        <Text>{convertTimeStringToDate(expiryDate)}</Text>
        <Text>{storagePlace}</Text>
        <Text>{calculateDaysDifference(expiryDate)} days</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    textAlign: 'center',
  },
  quantityButton: {
    padding: 10,
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    textAlign: 'center',
    width: 30,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectorText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 150,
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 10,
    alignItems: 'center',
  },
  iconRightButton: {
    paddingRight: 10,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ItemDetailsRow;
