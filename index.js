const express = require("express")
const cors = require("cors")
const app = express()
const indexRouter = require("./routes/index")
const apiRouter = require("./routes/api/notes")



//modules
app.use(express.json())

app.use(cors())



//rutas

app.use("/",indexRouter)
app.use("/api",apiRouter)


// Server Up and PORT
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Happy Hacking PORT: ${PORT}`)
})