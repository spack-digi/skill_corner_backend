const paymentRouter = require("./paymentRoutes");
const router = require("express").Router();

router.use("/payment", paymentRouter);

module.exports = router;
