import {loggedIn, currentUser} from "Reducers/selectors";
import {openLoginModal, openSignupModal} from "Actions/modal";
import {connect} from "react-redux";
import SessionButtons from "./session_buttons";
const mapStateToProps = state=>({loggedIn,currentUser});

const mapDispatchToProps = dispatch=>({openLoginModal,openSignupModal});
export default connect(mapStateToProps, mapDispatchToProps)(SessionButtons);