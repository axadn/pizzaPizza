import React from "react";
import SessionButtonsContainer from "./session_buttons_container";
import {NavLink} from "react-router-dom";

export default props=>(
 <div className = "nav-bar-component">
    <NavLink to="/">Order</NavLink>
    <NavLink to="/cart">Cart</NavLink>
    <SessionButtonsContainer/>
 </div>
);