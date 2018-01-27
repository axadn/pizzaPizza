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
User.create(
    {
        username: DEFAULT_ADMIN.username,
        password:DEFAULT_ADMIN.password
    },
    success=>console.log("created admin"),
    error=> console.log(error)
);

db.batchFromFile("seed.sql", err=>{
    if(err) console.log(err);
    process.exit(0);
});