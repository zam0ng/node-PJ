const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
  checksadd,
  userchecks,
  checksdel,
} = require("../controllers/viewController");
const { islogin, islogin2 } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.get("/checks/delete/:id",islogin2,checksdel);
router.get("/checks/add/:id",islogin2,checksadd);

router.get("/user/checks",islogin2, userchecks);

router.post("/reviewInsert", islogin2, insertReview);
router.post("/r_reviewInsert", islogin2, insertReReview);

module.exports = router;
