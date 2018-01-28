const db = require("./db");
db.connect(()=>{
   console.log("conncected");
   db.batchFromFile("createDatabase.sql", ()=>{
       console.log("done")
       process.exit(0);
    });
});