const db = require("../../db");
const SqlString = require('sqlstring');

module.exports.fromName = function(name, done, onError){
    db.get().query(
        SqlString.format('SELECT * FROM sizes WHERE name = ?', [name]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            } else if(result){
                done(result);
            }else done([]);
        }
    );
}

module.exports.update = function(id, params, done, onError){
    db.get().query(
        SqlString.format('UPDATE sizes SET name = ?, price = ? WHERE id = ?',
        [params.name, params.price, id]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}

module.exports.create = function(params, done, onError){
    db.get().query(
        SqlString.format('INSERT INTO sizes (name, price) VALUES (?, ?)', [params.name, params.price]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    )
}

module.exports.delete = function(id, done, onError){
    db.get().query(
        SqlString.format('DELETE FROM sizes WHERE id = ?', [id]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}