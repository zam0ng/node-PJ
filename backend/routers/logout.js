const router = require("express").Router();
const {logout,logout2} = require("../controllers/logincontroller");

router.get("/",logout2);

module.exports = router;