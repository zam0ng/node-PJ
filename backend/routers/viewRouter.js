const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
  Ta,
} = require("../controllers/viewController");
const { islogin2 } = require("../controllers/islogin");

router.get("/", viewInfo);
router.post("/reviewInsert", islogin2, insertReview);
router.post("/r_reviewInsert", islogin2, insertReReview);

router.get("/test", Ta);

module.exports = router;
