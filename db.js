const mysql = require('mysql');
const async = require('async');

const state = {
    pool: null
};

exports.seed = function seed(done){
    done();
}

exports.createDatabase = function createDatabase(done){
    const queries = fs.readFileSync("createDatabase.sql").toString()
    .replace(/(\r\n|\n|\r)/gm," ")
    .replace(/\s+/g, ' ');
    state.pool.query(queries,
        function (error, results, fields) {
            done(err);
        }
    );
}

exports.connect = function(done){
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'pizzaPizza'
    });
    done();
};

exports.get = function(){
    return state.pool;
}