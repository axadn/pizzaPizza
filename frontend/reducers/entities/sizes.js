import {RECEIVE_SIZES, ADD_SIZE, REMOVE_SIZE, UPDATE_SIZES} from "Actions/sizes";

export default (state = {}, action) =>{
    switch(action.type){
        case RECEIVE_SIZES:
            return action.sizes;
        case UPDATE_SIZES:{
            const copy = Object.assign({},state);
            action.queries.forEach(query=>{
                copy[query.id] = Object.assign({},copy[query.id],query);
            });
            return copy;
        }
        case ADD_SIZE:
            return Object.assign(
                {},
                state,
                {[action.size.id]: action.size}
            );
        case REMOVE_SIZE:{
            const copy = Object.assign(
                {}, state
            );
            delete copy[action.id];
            return copy
        }
        default:
            return state;
    }
};