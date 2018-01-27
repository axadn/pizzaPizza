import current_user from "./current_user";
import cart from "./cart";
import {combineReducers} from "redux";

export default combineReducers({
    current_user, cart
});