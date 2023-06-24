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
  reviewDelete,
  reviewMore,
  buycnt2,
} = require("../controllers/viewController");
const { islogin, islogin2 ,getLoginUser} = require("../controllers/islogin");

router.get("/how/usercnt",usercnt);

router.get("/how/price",howprice);

router.get("/follow/add/",islogin,followadd)
router.get("/follow/del",islogin,followdel)

router.get("/buy/cnt",buycnt);
router.get("/buy/cnt2",buycnt2);
router.get("/checks/cnt",checkscnt);

router.get("/user/checks",islogin, userchecks);
// router.get("/user/checkss",islogin, userchecks);
router.get("/user/follow",islogin, userfollow);

// 사용자가 책을 구매했는지 확인
router.get("/review/buys", islogin, getBuysList);
// 댓글 3개 이상 못쓰게 하기
router.get("/review/count", islogin, getReviewCount);

router.post("/reviewInsert", islogin, insertReview);
router.post("/r_reviewInsert", islogin, insertReReview);


router.get("/checks/viewcnt/:id",islogin,viewcnt);
router.get("/checks/buys/:id", islogin,checkbuys);
router.get("/checks/delete/:id",islogin,checksdel);
router.get("/checks/add/:id",islogin,checksadd);
router.get("/:id", viewInfo);

// 댓글 삭제를 위해 로그인한 유저 정보를 보내줌
router.get("/get/logininfo", getLoginUser);
// 댓글 삭제
router.get("/review/delete", islogin, reviewDelete);

router.get("/review/more", reviewMore);

module.exports = router;