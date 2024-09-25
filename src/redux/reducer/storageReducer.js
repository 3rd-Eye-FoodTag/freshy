import {createSlice} from '@reduxjs/toolkit';
import {REDUCER_NAME, ACTION_NAME} from './constants';
import {aysncField, success, fetch} from './asyncField';

//the name of these reducer can be regarded as type name
export const initialStorageReducer = {
  inventoryList: aysncField(),
  selectedFood: null,
  modal: {modalConstant: '', modalProp: ''},
  confirmFoodList: [],
  selectedFoodDetails: {},
};

const storageReducer = createSlice({
  name: REDUCER_NAME.storageReducer,
  initialState: {
    ...initialStorageReducer,
  },
  reducers: {
    //inventory
    [ACTION_NAME.fetchInventoryList]: state => {
      state.inventoryList = fetch(state.inventoryList);
    },
    [ACTION_NAME.fetchInventoryListSuccess]: (state, action) => {
      state.inventoryList = success(state.inventoryList, {
        data: action.payload.data,
      });
    },
    [ACTION_NAME.fetchInventoryListFailure]: (state, action) => {},

    [ACTION_NAME.addInventoryList]: (state, action) => {},
    [ACTION_NAME.addInventoryListSuccess]: (state, action) => {},
    [ACTION_NAME.updateSelectedFoodID]: (state, action) => {
      state.selectedFood = {...action.payload};
    },
    [ACTION_NAME.updateModalConstant]: (state, action) => {
      state.modal = {
        modalConstant: action.payload?.modalConstant,
        modalProps: action.payload?.modalProps || {},
      };
    },
    [ACTION_NAME.updateSelectedFoodDetails]: (state, action) => {
      state.selectedFoodDetails = {...action.payload};
    },
    [ACTION_NAME.resetConfirmationList]: state => {
      state.confirmFoodList = [];
    },
    [ACTION_NAME.addFoodItemToConfirmationList]: (state, action) => {
      state.confirmFoodList = [...state.confirmFoodList, {...action.payload}];
    },
    [ACTION_NAME.updateConfirmationList]: (state, action) => {
      state.confirmFoodList = [
        ...state.confirmFoodList.map(item => {
          if (action.payload.foodID === item.foodID) {
            return {...action.payload};
          } else {
            return item;
          }
        }),
      ];
    },
  },
});

//these are the actions
export const {
  fetchInventoryList,
  fetchInventoryListSuccess,
  fetchInventoryListFailure,
  addInventoryList,
  addInventoryListSuccess,
  updateSelectedFoodID,
  updateModalConstant,
  updateSelectedFoodDetails,
  addFoodItemToConfirmationList,
  updateConfirmationList,
  resetConfirmationList,
} = storageReducer.actions;

export const inventorySelector = state =>
  state.inventory.inventoryList?.data || [];
export const selectedFoodIdSelector = state =>
  state.inventory.selectedFood || '';
export const modalSelector = state => state.inventory.modal;
export const selectedFoodDetailsSelector = state =>
  state.inventory.selectedFoodDetails;
export const confirmationListSelector = state =>
  state.inventory.confirmFoodList;

export default storageReducer.reducer;
