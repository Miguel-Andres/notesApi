const mongoose = require("mongoose")

const connectionString = process.env.MONGO_DB_URI


//conexion a mongoDB


mongoose.connect(connectionString,{
    useNewUrlParser:true ,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(()=>{
    console.log("Database connected")
}) .catch(err=>{
    console.error(err)
})

//podemos hacerlo con eventos en ves de promesa

// mongoose.connection.on("open",_=>{
    //console.log("database connect",MONGO_DB_URI)
//})

// mongoose.connection.on("error",_=>{
    //console.log("ERROR")
//})





