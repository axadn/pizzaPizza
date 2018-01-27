import {RECEIVE_SIZES, ADD_SIZE, REMOVE_SIZE} from "Actions/sizes";

export default (state = {}, action) =>{
    switch(action.type){
        case RECEIVE_SIZES:
            return action.sizes;
        case ADD_SIZE:
            return Object.assign(
                {},
                state,
                {[action.size.id]: action.size}
            );
        case REMOVE_SIZE:
            const copy = Object.assign(
                {}, state
            );
            delete copy[action.id]
        default:
            return state;
    }
};