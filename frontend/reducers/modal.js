import {OPEN_LOGIN_MODAL, OPEN_SIGNUP_MODAL, 
     CLOSE_MODAL, RECEIVE_MODAL_ERRORS} from "Actions/modal";

export default (state = {errors: [], mode: null}, action) =>{
    switch(action.type){
        case OPEN_LOGIN_MODAL:
            return {errors: [], mode: "login"};
        case OPEN_SIGNUP_MODAL:
            return {errors: [], mode: "signup"};
        case CLOSE_MODAL:
            return {errors: [], mode: null};
        case RECEIVE_MODAL_ERRORS:
            return Object.assign({}, state, {errors: action.errors});
        default:
            return state;
    }
}