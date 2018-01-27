import {RECEIVE_TOPPINGS, ADD_TOPPING, REMOVE_TOPPING
} from "Actions/toppings";


export default (state = {}, action) =>{
    switch(action.type){
        case RECEIVE_TOPPINGS:
            return action.toppings;
        case ADD_TOPPING:
            return Object.assign(
                {},
                state,
                {[action.topping.id]: action.topping}
            );
        case REMOVE_TOPPING:
            const copy = Object.assign(
                {}, state
            );
            delete copy[action.id]
        default:
            return state;
    }
};