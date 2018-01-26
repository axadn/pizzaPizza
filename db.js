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
        database: 'pizzaPizza'
    });
    state.pool.query('CREATE DATABASE IF NOT EXISTS pizzaPizza',
        function (error, results, fields) {
            if (error) throw error;
            console.log('created database pizzaPizza');
            state.pool.query('CREATE TABLE IF NOT EXISTS users('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'name VARCHAR(30),'
                + 'password VARCHAR(60)'
                +  ')'
            );
            state.pool.query('CREATE TABLE sizes IF NOT EXISTS sizes('
                + 'id INT NOT NULL AUTO_INCREMENT',
                + 'PRIMARY KEY(id)',
                + 'size INT',
                + 'name VARCHAR(30)'
                + 'price DECIMAL(5,2)'
                + ')'
            );
            state.pool.query('CREATE TABLE toppings IF NOT EXISTS toppings('
                + 'id INT NOT NULL AUTO_INCREMENT'
                + 'PRIMARY KEY(id)'
                + 'name VARCHAR(30)'
                + 'price DECIMAL(5,2)'
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