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
        const errors = [];
        for(let i = 0; i < this.props.errors.length; ++i){
            errors.push(
                <li key={`modal-error-item${i}`}>{this.props.errors[i]}</li>
            );
        }
       return <Modal isOpen={this.props.isOpen} className = "auth-modal" overlayClassName = "modal-overlay">
            <SessionFormContainer/>
            <button onClick={this.handleClose} className="modal-exit">cancel</button>
            <ul className = "modal-errors">
                {errors}                
            </ul>
        </Modal>;
    }
};
 