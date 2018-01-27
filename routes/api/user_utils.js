const bcrypt = require('bcrypt');
const URLSafeBase64 = require('urlsafe-base64');
const crypto = require('crypto');
const SALT_ROUNDS = 10;
const db = require("../../db");
const SqlString = require('sqlstring');

module.exports.generateSessionToken = function generateSessionToken(done, onError){
    crypto.randomBytes(18, function(err, buf) {
        if (err){
          onError(err);
        }else done(URLSafeBase64.encode(buf));
    });
}

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

module.exports.fromUsername = function(username, done, onError){
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE username = ?', [username]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            } else if(result){
                done(result);
            }else done([]);
        }
    );
}

module.exports.setPassword = function setPassword(password, done, onError){
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