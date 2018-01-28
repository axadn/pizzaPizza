import {connect} from "react-redux";
import AdminDash from "./admin_dash";
import {getToppings, putToppings, receiveToppings} from "Actions/toppings";
import {getSizes, putSizes, receiveSizes} from "Actions/sizes";
import {toppings, sizes} from "Reducers/selectors";

const mapStateToProps = state=>({
    toppings: toppings(state),
    sizes: sizes(state)
});

const mapDispatchToProps = dispatch=>({
    getToppings: () => dispatch(getToppings(toppings=>dispatch(receiveToppings(toppings)))),
    getSizes: () => dispatch(getSizes(sizes=>dispatch(receiveSizes(sizes)))),
    putToppings: queries => dispatch(putToppings(
        success=>{
            updateToppings(queries);
        }
    )),
    putSizes: queries => dispatch(putToppings(
        success=>{
            updateSizes(queries);
        }
    ))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);