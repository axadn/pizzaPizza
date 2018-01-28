import {ADD_PIZZA, REMOVE_PIZZA, EMPTY_CART, RECEIVE_CART} from "Actions/cart";

export default (state = [], action) =>{
    switch(action.type){
        case ADD_PIZZA:
            return state.concat(action.pizza);
        case REMOVE_PIZZA:
            return state.slice(0,action.index).concat(
                state.slice(action.index + 1));
        case EMPTY_CART:
            return [];
        case RECEIVE_CART:
            return action.cart;
        default:
            return state;
    }
};