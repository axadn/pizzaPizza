import React from "react";
import {toppings, sizes} from "Reduceres/selectors";
import Order from "order";
import {addPizza} from "Actions/cart";

const mapStateToProps = state =>({
    toppings: toppings(state),
    sizes: sizes(state)
});

const mapDispatchToProps = dispatch => ({
    addPizza: pizza => dispatch(addPizza(pizza))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);