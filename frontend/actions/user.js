import{post} from "Utils/api/users";
export const postUser = (params, done, error)=> dispatch=>{
    post(params).then(
        ({data})=>{
            if(data.errors){
                error(data.errors);
            }
            else{
                done(data);
            }
        }
    );
}