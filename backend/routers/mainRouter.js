const router = require("express").Router();
const { OrderByView, OrderByStar,logincheck} = require("../controllers/mainController");
const { islogin,islogin2} =require("../controllers/islogin");

router.get("/viewlist", OrderByView);
router.get("/starlist", OrderByStar);
router.get("/logincheck",islogin,logincheck);
// router.get('/',(req,res)=>{
//     res.redirect("/http://13.209.64.80/frontend/index.html");
// })


module.exports = router;
