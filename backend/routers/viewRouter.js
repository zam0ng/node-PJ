const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
  checksadd,
  userchecks,
  checksdel,
  viewcnt,
  followadd,
  followdel,
  userfollow,
  getReviewCount,
  getBuysList,
  reviewDelete,
} = require("../controllers/viewController");
const { islogin, getLoginUser } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.get("/checks/delete/:id", islogin, checksdel);
router.get("/checks/add/:id", islogin, checksadd);

router.get("/follow/add/", islogin, followadd);
router.get("/follow/del", islogin, followdel);

router.get("/checks/viewcnt/:id", islogin, viewcnt);

router.get("/user/checks", islogin, userchecks);
// router.get("/user/checkss",islogin, userchecks);
router.get("/user/follow", islogin, userfollow);

// 사용자가 책을 구매했는지 확인
router.get("/review/buys", islogin, getBuysList);
// 댓글 3개 이상 못쓰게 하기
router.get("/review/count", islogin, getReviewCount);
router.post("/reviewInsert", islogin, insertReview);
router.post("/r_reviewInsert", islogin, insertReReview);

// 댓글 삭제를 위해 로그인한 유저 정보를 보내줌
router.get("/get/logininfo", getLoginUser);
// 댓글 삭제
router.get("/review/delete", islogin, reviewDelete);

module.exports = router;
