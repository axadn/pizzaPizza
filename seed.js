const db = require("./db");
const User = require("./routes/api/user_utils");
const SqlString = require('sqlstring');
db.connect(err=>{
    if(err) console.log(err);
});


const DEFAULT_ADMIN = {
    username: "admin",
    password: "password"
}
User.setPassword(DEFAULT_ADMIN.password, digest=>{
    User.generateSessionToken(token=>{
        db.get().query(
            SqlString.format("INSERT INTO users (username, password_digest, session_token, is_admin)" 
            + " VALUES(?, ?, ?, ?)",[DEFAULT_ADMIN.username, digest, token, false]),
            (error, results, fields)=>{
                if(error) console.log(error);
            }
        );
    }, error=> console.log(error)); 
}, error=> console.log(error));

db.batchFromFile("seed.sql", err=>{
    if(err) console.log(err);
    process.exit(0);
});