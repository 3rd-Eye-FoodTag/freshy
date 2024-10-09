import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shoppingListData from '../../utils/mockData/shoppingListData.json';

type ShoppingItem = {
  name: string; 
  isChecked: boolean;
};

type ShoppingState = {
  items: ShoppingItem[];
  selectedItems: ShoppingItem[];
};

const initialState: ShoppingState = {
  items: shoppingListData.map(item => ({
    name: item.name,
    isChecked: false,
  })),
  selectedItems: [],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    toggleCheckbox(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.name === action.payload);
      if (item) {
        item.isChecked = !item.isChecked;

        if (item.isChecked) {
          // Add to selected items
          state.selectedItems.push(item);
        } else {
          // Remove from selected items
          state.selectedItems = state.selectedItems.filter(i => i.name !== item.name);
        }

        console.log('Selected Items:', state.selectedItems); // Log selected items to console
      }
    },
  },
});

export const { toggleCheckbox } = shoppingSlice.actions;
export default shoppingSlice.reducer;
