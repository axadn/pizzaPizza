const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const User = require('./user_utils');
const Session = require("./session_utils");

module.exports = router;

function login(user, password, res, next){
    User.isPassword(password, user.password_digest,
        validLogin=>{
            if(validLogin){
                User.resetSessionToken(user.id,
                    token=>{
                        res.cookie("session_token", token);
                        res.json(User.renderUser(user));
                    }, next
                );
            }
            else res.json({errors:["invalid username or password"]});   
        },
        next
    );
}

router.post("/", function(req, res, next){
    User.fromUsername(req.body.username, user=>{
        if(user) login(user, req.body.password, res, next);
        else res.json({errors:["invalid username or password"]});
    }, next);
}); 

function logout(user, res, next){
    User.resetSessionToken(user.id, success=>{
        res.clearCookie("session_token");
        res.json("success");
    }, next);
};

router.delete("/", function(req, res, next){
    if(req.cookies.session_token){
        User.fromSessionToken(req.cookies.session_token, user=>{
            if(user) logout(user, res, next);
            else res.json({errors: "no such user"});
        }, next);
    }
    else res.json({errors:["not logged in"]});
});