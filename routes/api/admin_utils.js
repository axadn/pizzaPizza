const User = require("./user_utils");

module.exports.adminRoute = function(req, res, done, onError){
    User.currentUser(req,
        user=>{
            if(user){
                if(user.is_admin) done(user);
                else res.json({errors: ["not an admin"]});
            }
            else{
                res.json({errors: ["not logged in"]});
            }
        }
    ,onError);
};