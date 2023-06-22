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
} = require("../controllers/viewController");
const { islogin, islogin2 } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.get("/checks/delete/:id",islogin,checksdel);
router.get("/checks/add/:id",islogin,checksadd);

router.get("/how/usercnt",usercnt);

router.get("/how/price",howprice);

router.get("/follow/add/",islogin,followadd)
router.get("/follow/del",islogin,followdel)



router.get("/checks/viewcnt/:id",islogin,viewcnt);

router.get("/user/checks",islogin, userchecks);
// router.get("/user/checkss",islogin, userchecks);
router.get("/user/follow",islogin, userfollow);

router.post("/reviewInsert", islogin, insertReview);
router.post("/r_reviewInsert", islogin, insertReReview);

module.exports = router;