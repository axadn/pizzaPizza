import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root";
import {logger} from 'redux-logger';
import cartCookies from "./cart_cookies";

export default createStore(
    rootReducer, 
    applyMiddleware(thunk, cartCookies, logger)
);

