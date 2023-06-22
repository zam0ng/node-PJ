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
  howprice,
  usercnt,
  buycnt,
  checkscnt,
  checkbuys,
  getReviewCount,
  getBuysList,
} = require("../controllers/viewController");
const { islogin, islogin2 } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.get("/checks/delete/:id",islogin,checksdel);
router.get("/checks/add/:id",islogin,checksadd);

router.get("/how/usercnt",usercnt);

router.get("/how/price",howprice);

router.get("/follow/add/",islogin,followadd)
router.get("/follow/del",islogin,followdel)

router.get("/buy/cnt",buycnt);
router.get("/checks/cnt",checkscnt);


router.get("/checks/viewcnt/:id",islogin,viewcnt);
router.get("/checks/buys/:id", islogin,checkbuys)

router.get("/user/checks",islogin, userchecks);
// router.get("/user/checkss",islogin, userchecks);
router.get("/user/follow",islogin, userfollow);

// 사용자가 책을 구매했는지 확인
router.get("/review/buyss", islogin, getBuysList);
// 댓글 3개 이상 못쓰게 하기
router.get("/review/count", islogin, getReviewCount);

router.post("/reviewInsert", islogin, insertReview);
router.post("/r_reviewInsert", islogin, insertReReview);

module.exports = router;