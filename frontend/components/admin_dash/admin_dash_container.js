import {connect} from "react-redux";
import AdminDash from "./admin_dash";
import {getToppings, receiveToppings} from "Actions/toppings";
import {getSizes, receiveSizes} from "Actions/sizes";
import {toppings, sizes} from "Reducers/selectors";

const mapStateToProps = state=>({
    toppings: toppings(state),
    sizes: sizes(state)
});

const mapDispatchToProps = dispatch=>({
    getToppings: () => dispatch(getToppings(toppings=>dispatch(receiveToppings(toppings)))),
    getSizes: () => dispatch(getSizes(sizes=>dispatch(receiveSizes(sizes))))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);