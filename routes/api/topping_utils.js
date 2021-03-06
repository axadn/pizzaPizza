const db = require("../../db");
const SqlString = require('sqlstring');

module.exports.update = function(params, done, onError){
    const name = params.hasOwnProperty("name") ? SqlString.escape(params.name) : "name";
    const price = params.hasOwnProperty("price") ? SqlString.escape(params.price) : "price";
    db.get().query(
        `UPDATE toppings SET name = ${name}, price = ${price} WHERE id = ${params.id}`,
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}

module.exports.fromName = function(name, done, onError){
    db.get().query(
        SqlString.format('SELECT * from toppings WHERE name = ?',[name]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else if (result){
                done(result[0]);
            }else done([]);
        }
    );
}

module.exports.create = function(params, done, onError){
    db.get().query(
        SqlString.format('INSERT INTO toppings (name, price) VALUES (?, ?)', [params.name, params.price]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done({id: result.insertId});
        }
    )
}

module.exports.delete = function(id, done, onError){
    db.get().query(
        SqlString.format('DELETE FROM toppings WHERE id = ?', [id]),
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}
module.exports.renderTopping = ({id,name,price}) =>({
    id, name, price
});

module.exports.index = function (done, onError){
    db.get().query(
        "SELECT * from toppings",
        (error, result, fields)=>{
            if(error){
                onError(error);
            }else done(result);
        }
    );
}