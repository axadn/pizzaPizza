export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const DELETE_CURRENT_USER = "DELETE_CURRENT_USER";

export const receiveCurrentUser = user=>({
    user,
    type: RECEIVE_CURRENT_USER
});

export const deleteCurrentUser = () =>({
    type: DELETE_CURRENT_USER
});