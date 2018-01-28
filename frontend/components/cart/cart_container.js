import {connect} from "react-redux";
import {removePizza} from "Actions/cart";
import {cart, toppings, sizes} from "Reducers/selectors";
import Cart from "./cart";
import {getToppings, receiveToppings} from "Actions/toppings";
import {getSizes, receiveSizes} from "Actions/sizes";

const mapStateToProps = state =>({
    pizzas: cart(state),
    getPizzaInfo: pizza =>{
        const t = toppings(state);
        const s = sizes(state);
        let total = s[pizza.size].price; 
        const toppingNames = [];
        Object.keys(pizza.toppings).forEach(id=>{
            total += t[id].price;
            toppingNames.push(t[id].name);
        });
        return {sizeName: s[pizza.size].name, toppingNames, total}
    },
    toppings: toppings(state),
    sizes: sizes(state)
});

const mapDispatchToProps = dispatch=>({
    deletePizza: idx=> dispatch(removePizza(idx)),
    getToppings: () => dispatch(getToppings(toppings=>dispatch(receiveToppings(toppings)))),
    getSizes: () => dispatch(getSizes(sizes=>dispatch(receiveSizes(sizes))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);