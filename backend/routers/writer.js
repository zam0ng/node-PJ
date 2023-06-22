const router = require('express').Router();
const{WriterUpload,UserImg,NickChange,bookResult,bookResult2,bookResult3}= require("../controllers/writerContoller");
const {writerpage} = require("../img");
const {islogin2,islogin} = require("../controllers/islogin");

router.post("/",writerpage.single("upload"),islogin,WriterUpload)
router.get('/',islogin,UserImg)
router.get('/result',islogin,bookResult)
router.get('/result2',islogin,bookResult2)
router.get('/result3',islogin,bookResult3)
router.post("/nick",islogin,NickChange)
module.exports = router