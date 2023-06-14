const router = require("express").Router();
const {islogin,islogin2} = require("../controllers/islogin");
const {MypageUpload,UserImg,NickChange,reviewUpload} = require("../controllers/mypageContollers")
const {Mypage} = require("../img");


router.post("/",Mypage.single("upload"),MypageUpload);
// router.post("/",Mypage.single("upload"),islogin,(req,res)=>{
//     console.log("제발")
//     res.send("ddddd")
// });
router.get('/',islogin,UserImg)
router.get('/reviews',reviewUpload)
router.post("/nick",islogin2,NickChange)
module.exports = router;



//../backend/upload/
// /backend/upload/