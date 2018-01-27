const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const User = require('./user_utils');

router.get('/:id', function(req, res, next) {
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE id = ?', [req.params.id]),
        (error, results, fields) => {
            if (error){
                next(error);
            }
            else if(results){
                res.json({username: results[0].username})
            }
            else{
                res.status(404)
                res.json("not found");
            }
        }
    );
});

router.post('/', function(req, res, next){
    User.fromUsername(
        req.body.username,
        results =>{
            const errors = [];
            if(results.length !== 0){
                errors.push("username is taken");
            }
            if(req.body.username.length < 6){
                errors.push("username must be at least 6 characters");
            }else if(req.body.username.length >30){
                errors.push("username must be no more than 30 characters");
            }
            if(req.body.password.length < 6){
                errors.push("passwword must be at least 6 characters");
            }else if (req.body.password.length > 30){
                errors.push("password must be no more than 30 characters");
            }
            if(errors.length !==0){
                res.json({errors});
            }else{
                User.setPassword(req.body.password, digest=>{
                    User.generateSessionToken(token=>{
                        db.get().query(
                            SqlString.format("INSERT INTO users (username, password_digest, session_token, is_admin)" 
                            + "VALUES(?, ?, ?, ?)",[req.body.username, digest, token, false]),
                            (error, results, fields)=>{
                                if(error){
                                    next(error);
                                } 
                                else{
                                    res.json("success");
                                }
                            }
                        );
                    }, next); 
                }, next);
            }
        },
        error => next(error)
    );
});

module.exports = router;