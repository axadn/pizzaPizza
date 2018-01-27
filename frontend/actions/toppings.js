export const RECEIVE_TOPPINGS = "RECEIVE_TOPPINGS";
export const REMOVE_TOPPING = "REMOVE_TOPPING";
export const ADD_TOPPING = "ADD_TOPPING";
import {get} from "Utils/api/toppings";

export const receiveToppings = toppings =>({
    toppings,
    type: RECEIVE_TOPPINGS
});

export const removeTopping = id =>({
    toppings,
    type: REMOVE_TOPPING
});

export const addTopping = topping=>({
    topping,
    type: ADD_TOPPING
});

export const getToppings = (done, onError) => dispatch =>{
    get().then(({data})=>{
        if(data.errors){
            onError(data.errors);
        }
        else{
            done(data);
        }
    });
};