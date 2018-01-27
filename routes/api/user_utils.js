const bcrypt = require('bcrypt');
const URLSafeBase64 = require('urlsafe-base64');
const crypto = require('crypto');
const SALT_ROUNDS = 10;
const db = require("../../db");
const SqlString = require('sqlstring');
const Session = require('./session_utils');

module.exports.fromSessionToken = function fromSessionToken(token, done, onError){
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE session_token = ?', [token]),
        (error, result, fields) =>{
            if(error){
                OnError(error);
            }else done(result);
        }
    );
}

module.exports.currentUser = function(req, done, onError){
    const token = req.cookies.session_token;
    if(token) User.fromSessionToken(token, done, onError);
    else done(null);
};

module.exports.setSessionToken = function (id, token, done, onError){
    Session.generateSessionToken(token=>{
        db.get().query(
            SqlString.format("UPDATE users SET session_token = ? WHERE id = ?",
                [token, id]),
            (error, result, fields)=>{
                if(error){
                    onError(error);
                }
                else{
                    done(token);
                }
            }
        );
    });
};

module.exports.resetSessionToken = function resetSessionToken(id, done, onError){
    Session.generateSessionToken(token=>{
        module.exports.setSessionToken(id, token, 
            success=>{
                done(token);
            }, onError)
    }, onError);
}
module.exports.fromUsername = function(username, done, onError){
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE username = ?', [username]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            } else done(result[0]);
        }
    );
}

module.exports.generatePasswordDigest = function setPassword(password, done, onError){
    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
        if(err){
            onError(err);
        }else done(hash);
      });
}

module.exports.isPassword = function isPassword(password, hash, done, onError){
    bcrypt.compare(password, hash, function(err, res){
        if(err){
            onError(err);
        } else done(res);
    });
}

module.exports.create = function(params, done, onError){
    generatePasswordDigest(params.password, digest=>{
        Session.generateSessionToken(token=>{
            db.get().query(
                SqlString.format("INSERT INTO users (username, password_digest, session_token, is_admin)" 
                + "VALUES(?, ?, ?, ?)",[params.username, digest, token, false]),
                (error, results, fields)=>{
                    if(error){
                        next(error);
                    } 
                    else{
                        done();
                    }
                }
            );
        }, next); 
    }, next);
}