require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const indexRouter = require("./routes/index")
const apiRouter = require("./routes/api/notes")
var logger = require('morgan')
require("./mongo")




//modules
app.use(express.json())

app.use(cors())
app.use(logger('dev'));



//rutas

app.use("/",indexRouter)
app.use("/api",apiRouter)


// middleware de error
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// Server Up and PORT
const PORT = process.env.PORT 

const server = app.listen(PORT, () => {
  console.log(`Happy Hacking PORT: ${PORT}`)
})


module.exports= {app,server} 