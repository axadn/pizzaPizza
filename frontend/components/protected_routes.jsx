import {loggedIn, currentUser} from "Reducers/selectors";
import {withRouter, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

const Protected = ({component: Component, path, loggedIn, currentUser})=>(
    <Route exact path={path} render={props=>(
        loggedIn ? (
            <Component {...props}/>
        ):
            <Redirect to ="/"/>
    )}/>
);

const Admin = ({component: Component, path, currentUser}) =>(
    <Route exact path={path} render={props=>{
        if(currentUser && currentUser.is_admin){
            return <Component {...props}/>;
        }else{
            return <Redirect to="/"/>;
        }
    }}/>
);

const mapStateToProps = state =>(
    {
        loggedIn: loggedIn(state),
        currentUser: currentUser(state)
    }
);

export const AdminRoute = withRouter(connect(mapStateToProps)(Admin));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

