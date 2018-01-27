import React from "react";
import {connect} from "react-redux";
import {modal} from "Reducers/selectors";
import SessionForm from "./session_form";
import {postSession} from "Actions/session";
import {postUser} from "Actions/user";
import {closeModal, receiveModalErrors} from "Actions/modal";
import { receiveCurrentUser } from "../../actions/session";

const mapStateToProps = state =>({
    mode: modal(state)
});

const mapDispatchToProps = dispatch =>({
    postSession : params => dispatch(postSession(
        params,
        data=>{
            dispatch(receiveCurrentUser(data));
            dispatch(closeModal());
        },
        errors=>dispatch(receiveModalErrors(errors))
        )
    ),
    postUser : params => dispatch(postUser(
        params,
        data=>{
            dispatch(receiveCurrentUser({username: params.username, id: data.id, is_admin: false}));
            dispatch(closeModal());
        },
        errors=>dispatch(receiveModalErrors(errors))
    ))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)