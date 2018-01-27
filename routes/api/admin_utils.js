

module.exports.adminRoute = function(req, res, done, onError){
    if(req.cookies.session_token){
        db.get().query(
            SqlString.format("SELECT * from users WHERE session_token = ?", [req.cookies.session_token]),
            (error, result, fields)=>{
                if(error){
                    onError(error);
                }else{
                    if(result){
                        const user = result[0];
                        if(user.is_admin){
                            done(user);
                        }
                        else{
                            res.json({errors: ["not an admin"]});
                        }
                    }else{
                        res.json({errors: ["no such user"]});
                    }
                }
            }
        );
    }else{
        res.json({errors: ["not logged in"]});
    }
};