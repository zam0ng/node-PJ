const router = require("express").Router();
const {login,auth,changepwd} = require("../controllers/logincontroller");

router.get("/",login);
router.get("/auth",auth);
router.get("/changepwd",changepwd);

module.exports = router;