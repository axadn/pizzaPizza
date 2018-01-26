CREATE DATABASE IF NOT EXISTS pizzaPizza;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    username VARCHAR(30) NOT NULL UNIQUE,
    password_digest VARCHAR(60) NOT NULL,
    session_token VARCHAR(24) NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS sizes(             
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(30) NOT NULL UNIQUE,
    price DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS toppings(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(30) NOT NULL UNIQUE,
    price DECIMAL(5,2) NOT NULL
)