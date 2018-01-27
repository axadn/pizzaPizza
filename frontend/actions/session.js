export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const DELETE_CURRENT_USER = "DELETE_CURRENT_USER";
import {post, del} from "Utils/api/session";

export const receiveCurrentUser = user=>({
    user,
    type: RECEIVE_CURRENT_USER
});

export const deleteCurrentUser = () =>({
    type: DELETE_CURRENT_USER
});

export const postSession = (params, done, error) => dispatch =>{
    post(params).then(
        ({data}) =>{
            if(data.errors){
                error(data.errors);
            }
            else{
                done(data);
            }
        }
    );
}

export const deleteSession = done => dispatch =>{
    del().then(
        result=>{
            if(done) done(result);
            dispatch(deleteCurrentUser());
        }
    );
}