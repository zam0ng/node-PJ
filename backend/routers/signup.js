const router = require("express").Router();
const {signup} =require("../controllers/signupcontroller");


router.post("/",signup);


module.exports = router;