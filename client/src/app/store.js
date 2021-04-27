import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../features/counter/counterSlice';
import {watcherSaga} from './sagas/rootSaga';
import loginReducer from "../features/Admin/LoginSlice";
import dashboardReducer from "../features/Dashboard/dashboardSlice";
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const reducer = combineReducers({
    router: connectRouter(history),
    login:loginReducer,
    tasks:dashboardReducer

});
export const store = configureStore({
  reducer,
    middleware:[...getDefaultMiddleware({thunk:false}),sagaMiddleware,routerMiddleware(history)]
});

sagaMiddleware.run(watcherSaga);
