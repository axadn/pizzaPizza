import React from "react";

import MainContent from "./main_content";
import NavBar from "./nav_bar/nav_bar";
import {HashRouter} from "react-router-dom";

export default ()=>(
    <HashRoute>
        <div className="app">
            <NavBar/>
            <MainContent/>
        </div>
    </HashRoute>
);