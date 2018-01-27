export const ADD_PIZZA = "ADD_PIZZA";
export const REMOVE_PIZZA = "REMOVE_PIZZA";
export const EMPTY_CART = "EMPTY_CART";

export const addPizza = pizza =>({
    pizza,
    type: ADD_PIZZA
});

export const removePizza = index =>({
    index,
    type: REMOVE_PIZZA
});

export const emptyCart = () =>({
    type: EMPTY_CART
})