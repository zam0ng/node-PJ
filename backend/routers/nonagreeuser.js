const router = require("express").Router();
const {nonagreeuser,gradeUpdate} = require("../controllers/Nonagreeuser");

router.get("/",nonagreeuser);

router.post("/",gradeUpdate);

router.get("/posts", nonagreepost);

module.exports = router;