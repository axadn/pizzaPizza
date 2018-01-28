import React from "react";
import SessionButtonsContainer from "./session_buttons_container";
import {NavLink} from "react-router-dom";

export default props=>(
 <div className = "nav-bar-component">
    <div className = "nav-bar_left">
        <NavLink exact to="/">Order</NavLink>
        <NavLink exact to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></NavLink>
    </div>
    <SessionButtonsContainer/>
 </div>
);