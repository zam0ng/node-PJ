const router = require("express").Router();
const { viewInfo, insertReview, Ta } = require("../controllers/viewController");

router.get("/", viewInfo);
router.post("/reviewInsert", insertReview);

router.get("/test", Ta);

module.exports = router;
