import React from "react";

export default class SessionButtons extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.currentUser){
            return <div className="user-button">
                <a>{this.props.currentUser.username}</a>
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