const router = require("express").Router();
const { saveChat, getUserInfo } = require("../controllers/chatController");

router.post("/", saveChat);
router.get("/getUserInfo", getUserInfo);

module.exports = router;
