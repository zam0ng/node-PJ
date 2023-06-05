const router = require("express").Router();
const {login} = require("../controllers/logincontroller");

router.post("/",login);

module.exports = router;