const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const User = require('./user_utils');
const Session = require("./session_utils");

router.get('/:id', function(req, res, next) {
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE id = ?', [req.params.id]),
        (error, results, fields) => {
            if (error){
                next(error);
            }
            else if(results){
                res.json(User.renderUser(results[0]));
            }
            else{
                res.status(404);
                res.json("not found");
            }
        }
    );
});

function paramsErrors(username, password, done, onError){
    const errors = [];
    User.fromUsername(
        req.body.username,
        user =>{
            if(user){
                errors.push("username is taken");
            }
            if(username < 6){
                errors.push("username must be at least 6 characters");
            }else if(username >30){
                errors.push("username must be no more than 30 characters");
            }
            if(password.length < 6){
                errors.push("passwword must be at least 6 characters");
            }else if (password.length > 30){
                errors.push("password must be no more than 30 characters");
            }
            done(errors);
        }, onError
    );
};
router.post('/', function(req, res, next){
    paramsErrors(req.body.username, req.body.password, errors=>{
        if(errors.length ===0){
            User.create({username: req.body.username, password: req.body.password},
                resultId=> res.json(resultId), next);
        }else res.json({errors});
    }, next);
});

module.exports = router;