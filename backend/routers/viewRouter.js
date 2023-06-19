const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
  checksadd,
  userchecks,
  checksdel,
  viewcnt,
} = require("../controllers/viewController");
const { islogin, islogin2 } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.get("/checks/delete/:id",islogin,checksdel);
router.get("/checks/add/:id",islogin,checksadd);
router.get("/checks/viewcnt/:id",islogin,viewcnt);

router.get("/user/checks",islogin, userchecks);

router.post("/reviewInsert", islogin, insertReview);
router.post("/r_reviewInsert", islogin, insertReReview);

module.exports = router;
