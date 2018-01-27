import {connect} from "react-redux";
import {removePizza} from "Actions/cart";
import {cart, toppings, sizes} from "Reducers/selectors";

const mapStateToProps = state =>({
    pizzas: cart(state),
    getPizzaInfo: pizza =>{
        t = state(toppings);
        s = state(sizes);
        let total = s[pizza.size].price; 
        const toppingNames = [];
        Object.keys(pizza.toppings).forEach(id=>{
            total += t[id].price;
            toppingNames.push(t[id].name);
        });
        return {sizeName: s[pizza.size].name, toppingNames, total}
    }
});

const mapDispatchToProps = dispatch=>({
    deletePizza: idx=> dispatch(removePizza(idx))
});