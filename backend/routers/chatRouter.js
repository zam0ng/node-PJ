const router = require("express").Router();
const {
  saveChat,
  getUserInfo,
  getChatData,
  getUserName,
  confirmZero,
  changeone,
} = require("../controllers/chatController");
const { getLoginUser } = require("../controllers/islogin");

// 로그인한 유저의 정보를 가져옴
router.get("/getLoginUser", getLoginUser);

// 대화 내용 저장
router.post("/", saveChat);
// 고객센터 버튼을 누른 유저의 정보를 가져옴
router.get("/getUserInfo", getUserInfo);
// 고객센터 버튼을 누른 유저가 한 대화의 내용을 가져옴
router.get("/getChatData", getChatData);

router.get("/username",getUserName);
router.get("/confirmZero", confirmZero);
router.get("/changeone",changeone);

module.exports = router;
