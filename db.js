const mysql = require('mysql');
const async = require('async');
const fs = require('fs');

const state = {
    pool: null
};

exports.seed = function seed(done){
    done();
}

exports.createDatabase = function createDatabase(done){
    const queries = fs.readFileSync("createDatabase.sql").toString()
    .replace(/(\r\n|\n|\r)/gm," ")
    .replace(/\s+/g, ' ')
    .split(";");
    let composed = ()=>state.pool.query(queries[queries.length - 1], error=>done(error));
    for(let i = queries.length - 2; i >= 0 ; --i){
        composed = 
        function(callback){
            return ()=> state.pool.query(queries[i], (error) =>{
                if(error){
                    done(error);
                }
                else{ 
                    callback();
                }
            });
        }(composed);
    }
    composed();
}

exports.connect = function(done){
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'pizzaPizza'
    });
    exports.createDatabase(done);
};

exports.get = function(){
    return state.pool;
}