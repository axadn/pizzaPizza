import Modal from "react-modal";
import React from "react";
import SessionFormContainer from "./session_form_container";

export default class m extends React.Component{
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount(){
        Modal.setAppElement(document.querySelector(".app"));
    }
    handleClose(e){
        e.stopPropagation();
        e.preventDefault();
        this.props.closeModal();
    }
    render(){
       return <Modal isOpen={this.props.isOpen}>
            <SessionFormContainer/>
            <button onClick={this.handleClose} className="modal-exit">cancel</button>
        </Modal>;
    }
};
//className = "auth-modal"
//overlayClassName = "modal-overlay" 