const router = require('express').Router();
const {islogin2,islogin} = require("../controllers/islogin");
const {followingList,followadd, followdel} = require("../controllers/followingController")

router.get('/list',islogin,followingList)
// router.get('/add',islogin,followadd)
router.get('/del',islogin,followdel)
module.exports = routera