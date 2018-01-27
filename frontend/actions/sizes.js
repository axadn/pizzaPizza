export const RECEIVE_SIZES = "RECEIVE_SIZES";
export const REMOVE_SIZE = "REMOVE_SIZE";
export const ADD_SIZE = "ADD_SIZE";

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