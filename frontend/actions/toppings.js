export const RECEIVE_TOPPINGS = "RECEIVE_TOPPINGS";
export const REMOVE_TOPPING = "REMOVE_TOPPING";
export const UPDATE_TOPPINGS = "UPDATE_TOPPINGS";
export const ADD_TOPPING = "ADD_TOPPING";
import {get, put} from "Utils/api/toppings";

export const receiveToppings = toppings =>({
    toppings,
    type: RECEIVE_TOPPINGS
});
export const updateToppings = queries =>({
    queries,
    type: UPDATE_TOPPINGS
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

export const putToppings = (queries, done, onError) => dispatch =>{
    put(queries).then(({data})=>{
        if(data.errors)onError(data.errors);
        else done(data);
    });
};