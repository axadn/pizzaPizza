import React from "react";
import {Provider} from "react-redux";
import App from "./app";
import ModalContainer from "Components/modal/modal_container";

export default props=>(
    <Provider store ={props.store}>
        <div className = "app-and-modal">
            <App/>
            <ModalContainer/>
        </div>
    </Provider>
);