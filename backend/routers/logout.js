const router = require("express").Router();
const {logout} = require("../controllers/logincontroller");

router.get("/",logout);

module.exports = router;