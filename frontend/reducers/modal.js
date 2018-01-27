import {OPEN_LOGIN_MODAL, OPEN_SIGNUP_MODAL, 
     CLOSE_MODAL} from "Actions/modal";

export default (state = null, action) =>{
    switch(action.type){
        case OPEN_LOGIN_MODAL:
            return "login";
        case OPEN_SIGNUP_MODAL:
            return "signup";
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}