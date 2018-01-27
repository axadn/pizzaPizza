import React from "react";
import {connect} from "react-redux";
import {modal} from "Reducers/selectors";
import SessionForm from "./session_form";
import {postSession} from "Actions/session";
import {closeModal, receiveModalErrors} from "Actions/modal";

const mapStateToProps = state =>({
});

const mapDispatchToProps = dispatch =>({
    post : params => dispatch(postSession(
        params,
         ()=>dispatch(closeModal()),
         errors=>dispatch(receiveModalErrors(errors))
        )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)