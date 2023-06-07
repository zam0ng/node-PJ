const router = require("express").Router();
const {MypageUpload,UserImg,NickChange} = require("../controllers/mypageContollers")
const {Mypage} = require("../img");


router.post("/",Mypage.single("upload"),MypageUpload)
router.get('/',UserImg)
router.post("/nick",NickChange)
module.exports = router