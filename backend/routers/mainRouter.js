const router = require("express").Router();
const { OrderByView, OrderByStar,logincheck,admincheck,} = require("../controllers/mainController");
const { islogin,islogin2,adminislogin} =require("../controllers/islogin");

router.get("/viewlist", OrderByView);
router.get("/starlist", OrderByStar);
router.get("/logincheck",islogin,logincheck);
router.get("/admincheck",adminislogin);
// router.get('/',(req,res)=>{
//     res.redirect("/http://13.209.64.80/frontend/index.html");
// })


module.exports = router;
