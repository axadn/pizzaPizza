import {RECEIVE_TOPPINGS, UPDATE_TOPPINGS, ADD_TOPPING, REMOVE_TOPPING
} from "Actions/toppings";


export default (state = {}, action) =>{
    switch(action.type){
        case RECEIVE_TOPPINGS:
            return action.toppings;
        case UPDATE_TOPPINGS:{
            const copy = Object.assign({},state);
            action.queries.forEach(query=>{
                copy[query.id] = Object.assign({},copy[query.id],query);
            });
            return copy;
        }
        case ADD_TOPPING:
            return Object.assign(
                {},
                state,
                {[action.topping.id]: action.topping}
            );
        case REMOVE_TOPPING:{
            const copy = Object.assign(
                {}, state
            );
            delete copy[action.id];
            return copy;
        }
        default:
            return state;
    }
};