import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root";
import {logger} from 'redux-logger';

export default createStore(
    rootReducer, 
    applyMiddleware(thunk, logger)
);
