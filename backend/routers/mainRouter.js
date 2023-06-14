const router = require("express").Router();
const { OrderByView, OrderByStar,logincheck} = require("../controllers/mainController");
const { islogin} =require("../controllers/islogin");

router.get("/viewlist", OrderByView);
router.get("/starlist", OrderByStar);
router.get("/logincheck",islogin,logincheck);


module.exports = router;
