import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import store from "./store";
import {receiveCurrentUser} from "./actions/session";

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");
    if(window.currentUser){
        store.dispatch(receiveCurrentUser(window.curentUser));
        ReactDOM.render(<Root store={store}/>, root);
    }
});