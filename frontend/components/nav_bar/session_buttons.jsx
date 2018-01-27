import React from "react";

export default class SessionButtons extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.currentUser){
            return <div className="user-button">
                <a>{this.props.currentUser.username}</a>
            </div>
        }else{
            return <div className="modal-open-buttons">
                <div className="modal-open-button"
                onClick={props.openLoginModal}>
                    log in
                </div>
                <div className="modal-open-button"
                onClick={props.openSignupModal}>
                    sign up
                </div>
            </div>
        }
    }
};