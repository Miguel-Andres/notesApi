const express = require("express")
const  router = express.Router()
const apiController = require("../../controllers/api/apiController")


//Get ALL Notes
router.get("/notes",apiController.allNotes)

//Get find Notes
router.get("/notes/:id",apiController.findNotes)

//Post Notes

router.post("/notes",apiController.create)

// Delete Notes

router.delete("/notes/:id",apiController.delete)

module.exports = router