import {ADD_PIZZA, REMOVE_PIZZA, EMPTY_CART} from "Actions/cart";
export default store=>next=>action=>{
    switch(action.type){
        case ADD_PIZZA:
        case REMOVE_PIZZA:
        case EMPTY_CART:
            next(action);
            document.cookie = "cart="+JSON.stringify(store.getState().session.cart);
            return;
        default:
            return next(action);
    }
};
