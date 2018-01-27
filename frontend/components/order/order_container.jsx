import React from "react";
import {toppings, sizes} from "Reducers/selectors";
import Order from "./order";
import {addPizza} from "Actions/cart";
import {getToppings, receiveToppings} from "Actions/toppings";
import {getSizes, receiveSizes} from "Actions/sizes";
import {connect} from "react-redux";

const mapStateToProps = state =>({
    toppings: toppings(state),
    sizes: sizes(state)
});

const mapDispatchToProps = dispatch => ({
    addPizza: pizza => dispatch(addPizza(pizza)),
    getToppings: () => dispatch(getToppings(toppings=>dispatch(receiveToppings(toppings)))),
    getSizes: () => dispatch(getSizes(sizes=>dispatch(receiveSizes(sizes))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);