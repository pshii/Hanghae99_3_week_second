// 스토어 
import {legacy_createStore, combineReducers,applyMiddleware,compose } from "redux";
import word from "./modules/word"
import thunk from "redux-thunk";

// export const history = createBrowserHistory();


const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({word});  // 리듀서들 묶기 bucket:bucket 
const store = legacy_createStore(rootReducer,enhancer);  // 그걸로 스토어 만들기

export default store;

 