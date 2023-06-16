const router = require("express").Router();
const {login} = require("../controllers/logincontroller");

router.get("/",login);

module.exports = router;