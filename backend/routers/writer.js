const router = require('express').Router();
const{WriterUpload,UserImg,NickChange,bookResult,bookResult2,bookResult3}= require("../controllers/writerContoller");
const {writerpage} = require("../img");
const {islogin2} = require("../controllers/islogin");

router.post("/",writerpage.single("upload"),islogin2,WriterUpload)
router.get('/',islogin2,UserImg)
router.get('/result',bookResult)
router.get('/result2',bookResult2)
router.get('/result3',bookResult3)
router.post("/nick",islogin2,NickChange)
module.exports = router