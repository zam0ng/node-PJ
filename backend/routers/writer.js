const router = require('express').Router();
const{WriterUpload,UserImg,NickChange,bookResult}= require("../controllers/writerContoller");
const {writerpage} = require("../img");

router.post("/",writerpage.single("upload"),WriterUpload)
router.get('/',UserImg)
router.get('/result',bookResult)
router.post("/nick",NickChange)
module.exports = router