import React from "react";
import {connect} from "react-redux";
import {modal, modalErrors} from "Reducers/selectors";
import Modal from "./modal";
import {closeModal} from "Actions/modal";

const mapStateToProps = state =>({
    isOpen: !!modal(state),
    mode: modal(state),
    errors: modalErrors(state)
});
const mapDispatchToProps = dispatch =>({
    closeModal: ()=>dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);