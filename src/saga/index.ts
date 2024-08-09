import { all } from 'redux-saga/effects';
import { 
  watchLoginAccount,
  watchRegisterAccount,
  watchfetchUserInfo,
} from './profileInfo'
import {  
  watchFetchInventorySummary, 
  watchAddItemIntoInventory,
} from './inventory'

export default function* rootSaga() {
  yield all([
    watchfetchUserInfo(),
    watchLoginAccount(),
    watchRegisterAccount(),
    watchFetchInventorySummary(),
    watchAddItemIntoInventory()
  ]);
}