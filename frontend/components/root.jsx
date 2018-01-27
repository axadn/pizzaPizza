import React from "react";
import {Provider} from "react-redux";
import App from "./app";

export default props=>(
    <Provider store ={props.store}>
        <App/>
    </Provider>
);