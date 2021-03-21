const express = require("express")
const router = express.Router()
const  indexController  = require("../controllers/indexController")


//Get Home 

router.get("/",indexController.home)




module.exports= router ;