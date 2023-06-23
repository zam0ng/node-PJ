const router = require('express').Router();
const {islogin2,islogin} = require("../controllers/islogin");
const {buyList} = require("../controllers/buylistContoller")

router.get('/list',islogin,buyList)


module.exports =router

