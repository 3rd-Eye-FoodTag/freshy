import { createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAME, ACTION_NAME } from "./constants";
import { aysncField, success, fetch } from "./asyncField";

//the name of these reducer can be regarded as type name
export const initialStorageReducer = {
    inventoryList: aysncField(),
    selectedFood: null,
}

const storageReducer = createSlice({
    name: REDUCER_NAME.storageReducer,
    initialState: {
        ...initialStorageReducer,
    },
    reducers: {
        //inventory
        [ACTION_NAME.fetchInventoryList]: (state) => {
            state.inventoryList = fetch(state.inventoryList)
        },
        [ACTION_NAME.fetchInventoryListSuccess]: (state, action) => {
            state.inventoryList = success(state.inventoryList, {data: action.payload.data})
        },
        [ACTION_NAME.fetchInventoryListFailure]: (state, action) => {},

        [ACTION_NAME.addInventoryList]: (state, action) => {
            console.log("reducer",action)
        },
        [ACTION_NAME.addInventoryListSuccess]: (state, action) => {
            console.log("reducer",action)
        },
        [ACTION_NAME.updateSelectedFoodID] : (state, action) => {
            state.selectedFood = {...action.payload};
        }
        
    }
})

//these are the actions
export const {
    fetchInventoryList,
    fetchInventoryListSuccess,
    fetchInventoryListFailure,
    addInventoryList,
    addInventoryListSuccess,
    updateSelectedFoodID,
} = storageReducer.actions

export const inventorySelector = (state) => state.inventory.inventoryList?.data || [];
export const selectedFoodIdSelector = (state) => state.inventory.selectedFood || '';

export default storageReducer.reducer;