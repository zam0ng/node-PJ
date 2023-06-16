const router = require("express").Router();
const { OrderByView, OrderByStar,logincheck} = require("../controllers/mainController");
const { islogin,islogin2} =require("../controllers/islogin");

router.get("/viewlist", OrderByView);
router.get("/starlist", OrderByStar);
router.get("/logincheck",islogin2,logincheck);


module.exports = router;
