import React from "react";
import {Route} from "react-router-dom";
import {ProtectedRoute, AdminRoute} from "./protected_routes";
import OrderContainer from "./order/order_container";
import CartContainer from "./cart/cart_container";

export default props =>(
    <div className = "main-content">
        <Route exact path="/" component={OrderContainer}/>
        <Route exact path="/cart" component={CartContainer}/>
    </div>
);