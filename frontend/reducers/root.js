import {combineReducers} from "redux";
import entities from "./entities/entities";
import session from "./session/session";

export default combineReducers({
    entities,
    session
});