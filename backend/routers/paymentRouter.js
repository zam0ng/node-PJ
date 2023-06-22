const router = require("express").Router();
const { payReady, payApprove } = require("../controllers/paymentController");
const { islogin } = require("../controllers/islogin");

// 카카오페이 결제 준비
router.get("/ready", islogin, payReady);

// 카카오페이 결제 승인
router.get("/approve", islogin, payApprove);

module.exports = router;
