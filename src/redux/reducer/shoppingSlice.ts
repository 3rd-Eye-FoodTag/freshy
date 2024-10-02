// shoppingSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shoppingListData from '../../utils/mockData/shoppingListData.json';

type ShoppingItem = {
  foodName: string;
  isChecked: boolean;
};

type ShoppingState = {
  items: ShoppingItem[];
};

const initialState: ShoppingState = {
  items: shoppingListData.map(item => ({
    foodName: item.foodName,
    isChecked: false,
  })),
};

// 加载购物清单
export const loadShoppingList = createAsyncThunk(
  'shopping/loadShoppingList',
  async () => {
    const jsonValue = await AsyncStorage.getItem('shoppingList');
    if (jsonValue) {
      console.log('Loaded shopping list from AsyncStorage:', jsonValue);
      return JSON.parse(jsonValue);
    }
    console.log('No shopping list found in AsyncStorage.');
    return [];  // 返回空数组
  }
);

// 保存购物清单
export const saveShoppingList = async (items: ShoppingItem[]) => {
  const jsonValue = JSON.stringify(items);
  console.log('Saving shopping list to AsyncStorage:', jsonValue);
  await AsyncStorage.setItem('shoppingList', jsonValue);
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    toggleCheckbox(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.foodName === action.payload);
      if (item) {
        item.isChecked = !item.isChecked;
        console.log(item.foodName); // Log the food name when toggled
        saveShoppingList(state.items); // 每次切换复选框状态后保存当前购物清单状态
      }
    },
    setShoppingList(state, action: PayloadAction<ShoppingItem[]>) {
      state.items = action.payload;
    },
  },
});

// 处理加载购物清单并设置到 Redux 状态
export const loadAndSetShoppingList = () => async dispatch => {
  const items = await dispatch(loadShoppingList()).unwrap();
  if (items.length === 0) {
    // 如果购物清单为空，使用初始数据
    const initialItems = initialState.items;
    dispatch(setShoppingList(initialItems));
    saveShoppingList(initialItems); // 保存初始数据到 AsyncStorage
  } else {
    dispatch(setShoppingList(items));
  }
};

export const { toggleCheckbox, setShoppingList } = shoppingSlice.actions;
export default shoppingSlice.reducer;
