import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import {receiveCurrentUser} from "./actions/session";

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");
    const store = configureStore();
    if(window.currentUser){
        store.dispatch(receiveCurrentUser(window.curentUser));
        ReactDOM.render(<Root store={store}/>, root);
    }
});