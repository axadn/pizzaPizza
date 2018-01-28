import React from "react";
import {NavLink} from "react-router-dom";

export default class SessionButtons extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.currentUser){
            return <div className="user-button">
                Hello, <a>{this.props.currentUser.username}</a>!
                {this.props.currentUser.is_admin ?
                 <NavLink exact to="/dash">Dashboard</NavLink>
                :""}
                <button onClick={this.props.logout}>
                    log out
                </button>
            </div>
        }else{
            return <div className="modal-open-buttons">
                <button className="modal-open-button"
                onClick={this.props.openLoginModal} >
                    log in
                </button>
                <button className="modal-open-button"
                onClick={this.props.openSignupModal}>
                    sign up
                </button>
            </div>
        }
    }
};