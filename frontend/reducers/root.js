import {combineReducers} from "redux";
import entities from "./entities/entities";
import session from "./session/session";
import modal from "./modal";

export default combineReducers({
    entities,
    session,
    modal
});