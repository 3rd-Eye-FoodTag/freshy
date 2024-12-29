// ComponentWithMutation.tsx
import {currentUser} from '@/redux/reducer';
import {updateModalConstant} from '@/redux/reducer/storageReducer';
import {removeInventoryItem} from '@/utils/api';
import {useMutation, useQueryClient} from '@tanstack/react-query'; // Assuming react-query is being used
import {useDispatch, useSelector} from 'react-redux';

export const useRemoveFoodItem = foodID => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const currentUserUUID = useSelector(currentUser);

  const removeFoodItem = useMutation({
    mutationFn: async () => {
      return await removeInventoryItem(currentUserUUID, foodID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInventory']});
      dispatch(
        updateModalConstant({
          modalConstant: '',
        }),
      );
    },
  });

  return removeFoodItem;
};
