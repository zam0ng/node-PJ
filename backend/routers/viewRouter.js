const router = require("express").Router();
const {
  viewInfo,
  insertReview,
  insertReReview,
  Ta,
} = require("../controllers/viewController");

router.get("/", viewInfo);
router.post("/reviewInsert", insertReview);
router.post("/r_reviewInsert", insertReReview);

router.get("/test", Ta);

module.exports = router;
