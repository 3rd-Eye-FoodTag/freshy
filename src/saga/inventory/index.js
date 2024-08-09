import { put, select, takeEvery, call } from 'redux-saga/effects';
import { REDUCER_NAME, ACTION_NAME, actionType} from '../../redux/reducer/constants';
import { getInventoryList, updateInventoryList, registerAccount, postUserInfo } from '../../utils/api';
import { 
  fetchInventoryList, 
  fetchInventoryListSuccess, 
  fetchInventoryListFailure,
  addInventoryListSuccess,
} from '../../redux/reducer';
import { uidSelector } from '../../redux/reducer';
import { formattedDataFromFirebase, guidGenerator } from '../../utils/utils';

const addDays = (date, days) => {
  const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  return newDate;
}

const formatExpirationDate = (expiration) => {
  const dateCollection = expiration.split(' ')
  const number = dateCollection[1]
  const unit = dateCollection[2]

  const currentDate = new Date();

  let expirationDate = expiration;
  if (unit === "days") {
    expirationDate = addDays(currentDate, number)
  } else if (unit === "week"){
    expirationDate = addDays(currentDate, number * 7)
  } else if (unit === 'months') {
    expirationDate = addDays(currentDate, number * 30)
  }

  return expirationDate
}

export function* fetchInventorySummary({ payload = {} }) {
  try {
    const uid = yield select(uidSelector);
    const response = yield call(getInventoryList, { uid: uid});
    const { status, data } = response;
    if(status === 200) { 
      const formattedData =  formattedDataFromFirebase(data)
      yield put(fetchInventoryListSuccess({data: formattedData}));
    }
  } catch (error) {
    console.warn("here is issue with fetching inventoryData", error);
    yield put(fetchInventoryListFailure(data))
  }  
}

export function* watchFetchInventorySummary() {
  yield takeEvery(
    actionType(REDUCER_NAME.storageReducer, ACTION_NAME.fetchInventoryList),
    fetchInventorySummary);
}

export function* addInventoryItem({ payload = {} }) {
    try {
      const uid = yield select(uidSelector)
      const { navigate } = payload;
      const foodId = guidGenerator();
      
      const response = yield call(updateInventoryList, {
        data:{
          ...payload,
          ...{expirationDate: formatExpirationDate(payload.expiration)},
          id: foodId
        },
        uid: uid,
      });
      
      if(response.status === 200) {
        yield put(addInventoryListSuccess(response.data));
        yield put(fetchInventoryList());
        navigate('HomePage')
      }
    } catch (error) {
      console.warn("here is issue with adding item", error)
    }
  }
  
  export function* watchAddItemIntoInventory() {
    yield takeEvery(
      actionType(REDUCER_NAME.storageReducer, ACTION_NAME.addInventoryList), 
      addInventoryItem);
  }
  