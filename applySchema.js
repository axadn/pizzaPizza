const db = require("./db");
db.connect(error=>{
    if(error){
        console.log(error);
        process.exit(1);
    }
    else{
        console.log("conncected");
        db.batchFromFile("applySchema.sql", error=>{
            if(error){
                console.log(error);
                process.exit(1);
            }
            else{
                console.log("done")
                process.exit(0);
            }
        });
    }
});