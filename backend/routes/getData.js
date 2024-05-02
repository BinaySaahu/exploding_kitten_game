const express = require("express")

const router = express.Router()
const getDataController = require("../controllers/getDataController")

router.get('/',getDataController.getData);


module.exports = router