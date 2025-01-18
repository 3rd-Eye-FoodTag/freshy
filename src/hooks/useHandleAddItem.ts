import {useEffect, useState} from 'react';
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
import {addFoodItemsToFirebase} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {FoodItem, AddFoodRequestBody} from '../utils/interface';
import {currentUser} from '../redux/reducer';
import {postInventoryUpdateToFirebase} from '@/utils/routes';

const useHandleAddItem = () => {
  const queryClient = useQueryClient();
  const confirmationList = useSelector(confirmationListSelector);
  const currentUserUUID = useSelector(currentUser);
  const [notInfoodWiki, setNotInfoodWiki] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setNotInfoodWiki([]);
  }, []);

  const {data: foodWikiData = []} = useQuery<{data: any[]}>({
    queryKey: ['foodwiki'],
  });

  const {mutate: postToFoodWIki, error: postFoodWikiError} = useMutation({
    mutationFn: (newItems: any[]) => addFoodItemsToFirebase(newItems),
  });

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
    const foodWikiID = uuidv4();
    const addFoodRequestBody: AddFoodRequestBody = {
      foodID: foodWikiID,
      foodName: selectedFood?.foodName || selectedFood?.food,
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
      foodWikiID: selectedFood?.foodWikiID || foodWikiID,
      alternativeNames: selectedFood.alternativeNames,
      expiryDate: calculateExpirationDate(
        selectedFood.predictedFreshDurations?.fridge || 0,
      ),
      storageTip: selectedFood.comment || '',
      isFoodFromWiki: true,
    };

    return addFoodRequestBody;
  };

  //add an array to confirmation List
  const addArrayToConfirmationList = (foodArray: FoodItem[]) => {
    const todayDate = new Date();
    const mockFood = [...foodArray];

    let input = [];

    const foodWikiMap = new Map<string, any>();

    foodWikiData.forEach(food => {
      const key =
        food?.foodName?.toLowerCase() || food?.food?.toLowerCase() || '';
      foodWikiMap.set(key, food);
    });

    const confirmation = mockFood.map(item => {
      // Build a lookup map for foodWikiData to optimize search

      // Map through mockFood and check against the lookup map
      const key =
        item?.foodName?.toLowerCase() || item?.food?.toLowerCase() || '';
      const foodFromWiki = foodWikiMap.get(key);

      return {...(foodFromWiki || item), isFoodFromWiki: !!foodFromWiki};
    });

    if (confirmation.length > 0) {
      input = [...confirmation].map(item => {
        const foodWikiID = uuidv4();
        if (item?.isFoodFromWiki) {
          return {
            foodID: uuidv4(),
            foodName: item?.foodName || item?.name || item?.food || 'undefined',
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
            foodWikiID: item.foodWikiID || foodWikiID,
            alternativeNames: item.alternativeNames,
            expiryDate: calculateExpirationDate(
              item.predictedFreshDurations?.fridge || 0,
            ),
            storageTip: item.comment || '',
            isFoodFromWiki: item?.isFoodFromWiki,
            type: item.category,
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
            foodWikiID: item.foodWikiID || foodWikiID,
            alternativeNames: [],
            expiryDate: 'Fri Dec 27 2024 22:20:11 GMT-0800',
            storageTip: '',
            isFoodFromWiki: item?.isFoodFromWiki,
            type: item.category,
          };
        }
      });
    }

    [...input].forEach(requestBoday => {
      dispatch(addFoodItemToConfirmationList(requestBoday));
    });

    const foodNotInWiki = input.filter(item => !item.isFoodFromWiki);

    if (foodNotInWiki.length > 0) {
      setNotInfoodWiki(foodNotInWiki);
    }
  };

  return {
    addFoodToInventory: (isNew?: boolean, data?: any) => {
      if (isNew) {
        mutate({data: [...data]});
      } else {
        mutate({data: [...confirmationList]});
      }

      if (notInfoodWiki.length > 0) {
        postToFoodWIki(notInfoodWiki);
      }
    },
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
