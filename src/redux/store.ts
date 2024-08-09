import { configureStore, applyMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import combineReducers from './reducer';
import rootSaga from '../saga'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
