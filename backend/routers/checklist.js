const router = require('express').Router();
const {islogin2} = require("../controllers/islogin");
const {checkList} = require("../controllers/checklistController")

router.get('/list',islogin2,checkList)
module.exports = router