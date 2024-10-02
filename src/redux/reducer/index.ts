import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoReducer";
import storageReducer from './storageReducer'
import shoppingReducer from './shoppingSlice';

export * from './userInfoReducer'
// export * from './storageReducer'

export default combineReducers({
    userInfomation: userInfoReducer,
    inventory: storageReducer,
    shopping: shoppingReducer,
})