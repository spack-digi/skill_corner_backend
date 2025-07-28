const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-order", paymentController.CreateOrder);
router.post("/validate-payment", paymentController.validatePayment);
router.post("/refund-initiate", paymentController.refundInitiate);

module.exports = router;
