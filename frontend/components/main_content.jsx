import React from "react";
import {Route} from "react-router-dom";
import {ProtectedRoute, AdminRoute} from "./protected_routes";
import Order from "./order/order";

export default props =>(
    <div className = "main-content">
        <Route exact path="/" component={Order}/>
    </div>
);