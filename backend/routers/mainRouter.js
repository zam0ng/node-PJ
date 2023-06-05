const router = require("express").Router();
const { OrderByView, OrderByStar } = require("../controllers/mainController");

router.get("/viewlist", OrderByView);
router.get("/starlist", OrderByStar);

module.exports = router;
