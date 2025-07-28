const razorpay = require("../utils/razorpay");
const { Transaction } = require("../models");

const CreateOrder = async (req, res, next) => {
  try {
    let { amount, currency, email, mobile, name } = req.body;
    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
    });

    let trans = await Transaction.create({
      orderId: order.id,
      currency,
      amount: order.amount / 100,
      status: "Pending",
      name,
      email,
      mobile,
    });
    res.status(200).json({
      success: true,
      message: "Order Created successfully",
      data: trans,
    });
  } catch (error) {
    console.log(error);
    console.log("error from here", error.message);
    next(error);
  }
};

const validatePayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    let data = await razorpay.payments.fetch(razorpay_payment_id);
    const { amount, status } = data;

    const transaction = await Transaction.findOne({
      where: { orderId: razorpay_order_id },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
    if (status === "captured") {
      await transaction.update({ status: "Success" });
    }
    res.status(200).json({
      success: true,
      message: "payment-successful",
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const refundInitiate = async (req, res, next) => {
  try {
    const { paymentId, amount } = req.body;
    const refundResponse = await razorpay.payments.refund(paymentId, {
      amount: amount,
    });
    res.status(200).json({
      success: true,
      message: "Refund successful",
      data: refundResponse,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const paymentWebHook = async (req, res, next) => {
  try {
    const secret = "your_webhook_secret";
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature === expectedSignature) {
      const event = req.body.event;
      const payload = req.body.payload;

      switch (event) {
        case "payment.captured":
          // TODO: Send Email of payment success to Customer
          console.log("Payment captured:", payload);
          break;
        case "order.paid":
          console.log("Order paid:", payload);
          break;
        default:
          console.log("Unhandled event:", event);
      }

      res
        .status(200)
        .json({ success: true, message: "Webhook processed successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  CreateOrder,
  validatePayment,
  refundInitiate,
  paymentWebHook,
};
