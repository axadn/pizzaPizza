const db = require("./db");
db.connect();

db.batchFromFile("seed.sql");