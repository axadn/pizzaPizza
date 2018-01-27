export const RECEIVE_SIZES = "RECEIVE_SIZES";
export const REMOVE_SIZE = "REMOVE_SIZE";
export const ADD_SIZE = "ADD_SIZE";
import {get} from "Utils/api/sizes";

export const receiveSizes = sizes =>({
    sizes,
    type: RECEIVE_SIZES
});

export const removeSize = id =>({
    size,
    type: REMOVE_SIZE
});

export const addSize = size=>({
    size,
    type: ADD_SIZE
});

export const getSizes = (done, onError) => dispatch =>{
    get().then(({data})=>{
        if(data.errors){
            onError(data.errors);
        }
        else{
            done(data);
        }
    });
};