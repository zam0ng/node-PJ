const router = require('express').Router();
const {islogin2} = require("../controllers/islogin");
const {checkList} = require("../controllers/checklistController")

router.get('/list',islogin,checkList)
module.exports = router