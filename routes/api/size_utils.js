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
module.exports.update = function(params, done, onError){
    debugger;
    const name = params.name ? SqlString.escape(params.name) : "name";
    const price = params.price ? SqlString.escape(params.price) : "price";
    db.get().query(
        `UPDATE sizes SET name = ${name}, price = ${price} WHERE id = ${params.id}`,
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
            }else done({id: result.insertId});
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
module.exports.renderSize = ({id, price, name})=>({id,price,name});

module.exports.index = function (done, onError){
    db.get().query(
        "SELECT * from sizes",
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}