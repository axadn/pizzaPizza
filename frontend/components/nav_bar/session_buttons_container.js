import {loggedIn, currentUser} from "Reducers/selectors";
import {openLoginModal, openSignupModal} from "Actions/modal";
import {connect} from "react-redux";
import SessionButtons from "./session_buttons";
const mapStateToProps = state=>({
    loggedIn: loggedIn(state),
    currentUser: currentUser(state)
});
const mapDispatchToProps = dispatch=>({
    openLoginModal: ()=> dispatch(openLoginModal()),
    openSignupModal: ()=> dispatch(openSignupModal())
});
export default connect(mapStateToProps, mapDispatchToProps)(SessionButtons);