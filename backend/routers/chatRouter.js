const router = require("express").Router();
const {
  saveChat,
  getUserInfo,
  getChatData,
} = require("../controllers/chatController");

// 대화 내용 저장
router.post("/", saveChat);
// 고객센터 버튼을 누른 유저의 정보를 가져옴
router.get("/getUserInfo", getUserInfo);
// 고객센터 버튼을 누른 유저가 한 대화의 내용을 가져옴
router.get("/getChatData", getChatData);

module.exports = router;
