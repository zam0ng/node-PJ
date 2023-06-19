const router = require("express").Router();
const {login,auth,changepwd,mailauth} = require("../controllers/logincontroller");

router.get("/",login);

router.get("/findpwd",mailauth);
router.get("/auth",auth);
router.get("/changepwd",changepwd);

module.exports = router;