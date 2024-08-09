import { put, takeEvery, call, select } from 'redux-saga/effects';
import { REDUCER_NAME, ACTION_NAME, actionType} from '../../redux/reducer/constants';
import { 
  loginAccount, 
  registerAccount, 
  postUserInfo, 
  refreshToken,
  fetchUserList,
} from '../../utils/api';
import { setAuthenticationStatus, setAuthenticating, fetchUserInfoSuccess} from '../../redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { uidSelector } from '../../redux/reducer';

export function* fetchUserInfo ({ payload = {} }) {
  try {
    const uid = yield select(uidSelector);
    const { status, data } = yield call(fetchUserList, { uid: uid });
    yield console.log("hahahhaha", status, data, uid)
    if (status === 200){
      const list = []
      for (const key in data) {
        const obj =  {
          key: key,
          data: data[key].data
        }
        list.push(obj)
      }
      const userSelected = list[0].data
      yield put(fetchUserInfoSuccess({ data: userSelected }));
    }
  } catch (error) {
    yield console.warn("here is issue with fetching user data", error)
  }
}

export function* watchfetchUserInfo() {
  yield takeEvery(
    actionType(REDUCER_NAME.userSettingReducer, ACTION_NAME.fetchUserInfo), 
    fetchUserInfo
  );
}

export function* register({ payload = {} }) {
  try {
    const { navigate, email, password, data = {} } = payload;
    //register a new account with email and password Info
    const response = yield call(registerAccount, { email: email.trim(), password: password.trim() });
    if(response.status === 200) {
      const { token, localId: uid } = response;
      //update the user info
      const updateResonse = yield call(postUserInfo, {...data, uid: uid, token: token})
      if(updateResonse.status === 200) {
        navigate('WelcomeScreen');
      }
    }
  } catch (error) {
    // yield put({ type: 'FETCH_DATA_ERROR', error });
    yield console.warn("here is issue with registration", error)
  }
}

export function* watchRegisterAccount() {
  yield takeEvery(
    actionType(REDUCER_NAME.userSettingReducer, ACTION_NAME.register), 
    register
  );
}


export function* login({ payload = {} }) {
  try {
    const storedToken = yield call(()=> {
      return AsyncStorage.getItem('refreshToken')
    }) 

    if(storedToken) {
      const refreshResponse = yield call(refreshToken, {refreshToken: storedToken})
      yield put(setAuthenticationStatus({ ...refreshResponse , idToken: refreshResponse?.id_token, uid: refreshResponse?.user_id }))
      return
    }

    const { email, password } = payload;
    yield put(setAuthenticating({ isAuthenticating: true }))
    const response = yield call(loginAccount, { email, password });

    if(response.status === 200) {
      const { refreshToken } = response;
      yield put(setAuthenticationStatus({ ...response }))
      yield put(setAuthenticating({ isAuthenticating: false }))
      AsyncStorage.setItem('refreshToken', refreshToken)
    }
  } catch (error) {
    // yield put({ type: 'FETCH_DATA_ERROR', error });
    console.warn("here is issue with login", error)
    yield put(setAuthenticating({ isAuthenticating: false }))
  }
}

export function* watchLoginAccount() {
  yield takeEvery(
    actionType(REDUCER_NAME.userSettingReducer, ACTION_NAME.loginStatus), 
    login);
}
