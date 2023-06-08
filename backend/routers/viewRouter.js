const router = require("express").Router();
const { viewInfo } = require("../controllers/viewController");

router.get("/", viewInfo);

module.exports = router;
