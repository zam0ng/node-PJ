const router = require('express').Router();
const {islogin2,islogin} = require("../controllers/islogin");
const {buyList,buyadd} = require("../controllers/buylistContoller")

router.get('/list',islogin,buyList)
router.get('/add',islogin.buyadd)


module.exports =router

