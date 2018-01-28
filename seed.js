const db = require("./db");
const User = require("./routes/api/user_utils");
const SqlString = require('sqlstring');
const DEFAULT_ADMIN = require("./defaultAdmin");
db.connect(err=>{
});

User.create(
    {
        username: DEFAULT_ADMIN.username,
        password:DEFAULT_ADMIN.password,
        is_admin: true
    },
    success=>{
        db.batchFromFile("seed.sql", err=>{
            process.exit(0);
        });
    },
    error=>{
        console.log(error);
    } 
);