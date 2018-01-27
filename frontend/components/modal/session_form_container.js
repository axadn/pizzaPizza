import React from "react";
import {connect} from "react-redux";
import {modal} from "Reducers/selectors";
import SessionForm from "./session_form";

const mapStateToProps = state =>({
    mode: modal(state)
});

const mapDispatchToProps = dispatch =>({

});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)