const mysql = require('mysql');
const async = require('async');

const state = {
    pool: null
};

function seed(pool){

}
exports.connect = function(done){
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
    });
    state.pool.query('CREATE DATABASE IF NOT EXISTS pizzaPizza',
        function (error, results, fields) {
            if (error) throw error;
            state.pool.query('CREATE TABLE IF NOT EXISTS users('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'username VARCHAR(30) NOT NULL UNIQUE,'
                + 'password_digest VARCHAR(60) NOT NULL,'
                + 'session_token VARCHAR NOT NULL UNIQUE,'
                + 'is_admin BOOL NOT NULL'
                +  ')'
            );
            state.pool.query('CREATE TABLE sizes IF NOT EXISTS sizes('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'name VARCHAR(30) NOT NULL,'
                + 'price DECIMAL(5,2) NOT NULL,'
                + 'CONSTRAINT name_unique UNIQUE(name)'
                + ')'
            );
            state.pool.query('CREATE TABLE toppings IF NOT EXISTS toppings('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'name VARCHAR(30) NOT NULL,'
                + 'price DECIMAL(5,2) NOT NULL,'
                + 'CONSTRAINT name_unique UNIQUE(name)'
                + ')'
            );
        }
    );
    state.pool.q
    done();
};

exports.get = function(){
    return state.pool;
}