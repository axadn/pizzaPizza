const db = require("./db");
db.connect();

db.batchFromFile("createDatabase.sql");