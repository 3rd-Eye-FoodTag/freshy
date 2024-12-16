import {v4 as uuidv4} from 'uuid';
import {calculateExpirationDate} from '../utils/utils';
import {
  addFoodItemToConfirmationList,
  confirmationListSelector,
  resetConfirmationList,
  updateConfirmationList,
  updateModalConstant,
} from '../redux/reducer/storageReducer';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {postInventoryUpdateToFirebase} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {FoodItem, AddFoodRequestBody} from '../utils/interface';
import {useEffect, useState} from 'react';
import {currentUser} from '../redux/reducer';

const useHandleAddItem = () => {
  const queryClient = useQueryClient();
  const confirmationList = useSelector(confirmationListSelector);
  const currentUserUUID = useSelector(currentUser);
  const [checkWiki, setCheckWiki] = useState(false);
  const dispatch = useDispatch();

  const {data: foodWikiData = []} = useQuery<{data: any[]}>({
    queryKey: ['foodwiki'],
  });
  useEffect(() => {
    if (checkWiki) {
    }
  }, [checkWiki]);

  // Handle submission process to inventory
  const {error, isPending, mutate} = useMutation({
    mutationFn: async (postPayload: {data: any}) => {
      const {data} = postPayload;
      return await postInventoryUpdateToFirebase(currentUserUUID, data);
    },
    onSuccess: () => {
      // Clear modal and confirmation list on success
      dispatch(updateModalConstant({modalConstant: ''}));
      dispatch(resetConfirmationList(''));
      // Invalidate cache to refresh data
      queryClient.invalidateQueries({queryKey: ['userInventory']});
    },
    onError: err => {
      console.error('Error updating inventory:', err);
    },
  });

  /**
   * Update the quantity of a food item in the confirmation list.
   * @param listIndex - Index of the item in the list.
   * @param change - Change in quantity (positive or negative).
   */
  const updateQuantity = (listIndex: number, change: number) => {
    const newData = confirmationList.find(item => item.foodID === listIndex);
    if (!newData) {
      return;
    }

    dispatch(
      updateConfirmationList({
        ...newData,
        quantity: Math.max((newData.quantity || 0) + change, 0),
      }),
    );
  };

  /**
   * Add a food item to the confirmation list.
   * @param selectedFood - The food item to be added.
   * @param currentUserUUID - The UUID of the current user.
   */
  const addConfirmationList = (selectedFood: FoodItem) => {
    const todayDate = new Date();
    const addFoodRequestBody: AddFoodRequestBody = {
      foodID: uuidv4(),
      foodName: selectedFood?.foodName,
      quantity: selectedFood.quantity || 1,
      category: selectedFood.category,
      predictedFreshDurations: selectedFood.predictedFreshDurations,
      consumed: false,
      share: true,
      freshnessScore: 100,
      storagePlace: selectedFood.storagePlace || 'Fridge',
      cost: 0,
      groceryStore: '',
      imageName: selectedFood.imageName,
      consumedAt: '',
      updatedByUser: currentUserUUID,
      createdBy: todayDate.toISOString(),
      purchaseDate: todayDate.toISOString(),
      createdAt: todayDate.toISOString(),
      updatedAt: todayDate.toISOString(),
      foodWikiID: selectedFood.foodWikiID,
      alternativeNames: selectedFood.alternativeNames,
      expiryDate: calculateExpirationDate(
        selectedFood.predictedFreshDurations?.fridge || 0,
      ),
      storageTip: selectedFood.comment,
    };

    return addFoodRequestBody;
  };

  //add an array to confirmation List
  const addArrayToConfirmationList = (foodArray: FoodItem[]) => {
    const todayDate = new Date();
    const mockFood = [...foodArray];

    let input = [];

    const confirmation = mockFood.map(item => {
      const foodFromWiki = foodWikiData.find(food => {
        const a = food?.foodName?.toLowerCase() || '';
        const b = item?.foodName?.toLowerCase() || '';
        return a === b;
      });

      return {...(foodFromWiki || item), isFoodFromWiki: !!foodFromWiki};
    });

    let inFoodWikiFood = mockFood.filter(item => item.foodName === 'Lemon');
    let notInfoodWikifood = mockFood.filter(item => item.foodName !== 'Lemon');

    if (confirmation.length > 0) {
      input = [...confirmation].map(item => {
        if (item?.isFoodFromWiki) {
          return {
            foodID: uuidv4(),
            foodName: item?.foodName || item?.name || 'undefined',
            quantity: item.quantity || 1,
            category: item.category,
            predictedFreshDurations: item.predictedFreshDurations,
            consumed: false,
            share: true,
            freshnessScore: 100,
            storagePlace: item.storagePlace || 'Fridge',
            cost: item.price || 0,
            groceryStore: '',
            imageName: item.imageName,
            consumedAt: '',
            updatedByUser: currentUserUUID,
            createdBy: todayDate.toISOString(),
            purchaseDate: todayDate.toISOString(),
            createdAt: todayDate.toISOString(),
            updatedAt: todayDate.toISOString(),
            foodWikiID: item.foodWikiID,
            alternativeNames: item.alternativeNames,
            expiryDate: calculateExpirationDate(
              item.predictedFreshDurations?.fridge || 0,
            ),
            storageTip: item.comment,
            isFoodFromWiki: item?.isFoodFromWiki,
          };
        } else {
          return {
            foodID: uuidv4(),
            foodName: item?.foodName || item?.name || 'undefined',
            quantity: item?.quantity || 1,
            category: item?.category,
            predictedFreshDurations: item.predictedFreshDurations || {},
            consumed: false,
            share: true,
            freshnessScore: 100,
            storagePlace: 'Fridge',
            cost: item.cost || 0,
            groceryStore: '',
            imageName: '',
            consumedAt: '',
            updatedByUser: currentUserUUID,
            createdBy: todayDate.toISOString(),
            purchaseDate: todayDate.toISOString(),
            createdAt: todayDate.toISOString(),
            updatedAt: todayDate.toISOString(),
            // foodWikiID: item?.foodWikiID,
            alternativeNames: [],
            expiryDate: 'Fri Dec 27 2024 22:20:11 GMT-0800',
            storageTip: '',
            isFoodFromWiki: item?.isFoodFromWiki,
          };
        }
      });
    }

    [...input].forEach(requestBoday => {
      dispatch(addFoodItemToConfirmationList(requestBoday));
    });
  };

  return {
    addFoodToInventory: () => mutate({data: [...confirmationList]}),
    addFoodItemToConfirmationList: (selectedFood: FoodItem) => {
      const addFoodRequestBody = addConfirmationList(selectedFood);

      dispatch(addFoodItemToConfirmationList(addFoodRequestBody));
    },
    updateQuantity,
    addArrayToConfirmationList,
    confirmationList,
    isPending,
    error,
  };
};

export default useHandleAddItem;
