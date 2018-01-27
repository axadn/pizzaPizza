export const loggedIn = (state)=> !!state.session.current_user;
export const currentUser = state => state.session.current_user;
export const cart = state=> state.session.cart;
export const toppings = state=> state.entities.toppings;
export const sizes = state=> state.entities.sizes;
export const sizeById = (state, id) => state.entities.sizes[id];
export const toppingById = (state, id) => state.entities.toppings[id];
export const cartItemByIndex = (state, index) => state.entities.cart.pizzas[index];
export const modal = state => state.modal;