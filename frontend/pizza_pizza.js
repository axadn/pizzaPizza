import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import store from "./store";
import {receiveCurrentUser} from "./actions/session";
import {receiveCart} from "Actions/cart";
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
  
document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");
    if(window.currentUser){
        store.dispatch(receiveCurrentUser(window.currentUser));
    }

    try{
        store.dispatch(receiveCart(JSON.parse(getCookie("cart"))));
    }
    catch(err){
            
    }
    ReactDOM.render(<Root store={store}/>, root);
});