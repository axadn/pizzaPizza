import {RECEIVE_CURRENT_USER, DELETE_CURRENT_USER
 } from "Actions/session";

export default (state = null, action) =>{
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return action.user;
        case DELETE_CURRENT_USER:
            return null;
        default:
            return state;
    }
};