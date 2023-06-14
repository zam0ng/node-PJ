const router = require("express").Router();
const {nonagreeuser,gradeUpdate,nonagreepost,acceptUpdate,rejectUpdate} = require("../controllers/Nonagreeuser");

router.get("/",nonagreeuser);

router.post("/",gradeUpdate);

router.get("/posts",nonagreepost);

router.get("/acceptUpdate",acceptUpdate);

router.get("/rejectUpdate",rejectUpdate);

module.exports = router;