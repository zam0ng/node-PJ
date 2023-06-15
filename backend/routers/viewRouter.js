const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
} = require("../controllers/viewController");
const { islogin, islogin2 } = require("../controllers/islogin");

router.get("/:id", viewInfo);
router.post("/reviewInsert", islogin2, insertReview);
router.post("/r_reviewInsert", islogin2, insertReReview);

module.exports = router;
