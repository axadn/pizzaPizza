const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const User = require('./user_utils');
const Session = require("./session_utils");

module.exports = router;

router.post("/", function(req, res, next){
    User.fromUsername(res.params.username, result=>{
        if(result.length === 0){
            res.json({errors:["invalid username or password"]});
        }
        else{
            user = result[0];
            User.isPassword(res.params.password, user.password_digest,
                validLogin=>{
                    if(validLogin){
                        Session.generateSessionToken(token=>{
                            db.get().query(
                                SqlString.format("UPDATE users SET session_token = ? WHERE id = ?",
                                    [token,user.id]),
                                (error, result, fields)=>{
                                    if(error){
                                        next(error);
                                    }
                                    else{
                                        res.cookie("session_token", token);
                                        res.json({id: user.id, username: user.username,
                                            is_admin: user.is_admin});
                                    }
                                }
                            );
                        }, next);
                    }
                    else{
                        res.json({errors:["invalid username or password"]});
                    }
                },
                next
            );
        }
    },next)
}); 

router.delete("/", function(req, res, next){
    if(req.cookies.session_token){
        User.fromSessionToken(req.cookies.session_token, result=>{
            if(result.length === 0){
                res.json({errors: "no such user"});
            }
            else{
                const user = result[0];
                Session.generateSessionToken(token=>{
                    db.get().query(
                        SqlString.format(
                            "UPDATE users SET (session_token = ? WHERE id = ?",[token, user.id]
                        )
                        ,(err, result, fields)=>{
                            if(error){
                                next(error);
                            }else{
                                res.clearCookie("session_token");
                                res.json("success");
                            }
                        }
                    );
                }, next);
            }
        }, next);
    }
    else{
        res.json({errors:["not logged in"]});
    }
});