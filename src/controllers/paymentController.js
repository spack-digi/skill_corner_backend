const razorpay = require("../utils/razorpay");
const { Transaction } = require("../models");
const {
  userMailTemplate,
  adminMailTemplate,
} = require("../utils/mailTemplates");
const { sendMail } = require("../utils/nodemailer");
const envVars = require("../config/envVars");
const { Op } = require("sequelize");

const CreateOrder = async (req, res, next) => {
  try {
    let { amount, currency, email, mobile, name } = req.body;

    const transExists = await Transaction.findOne({
      where: {
        email,
        createdAt: {
          [Op.gt]: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        },
        status: "Success",
      },
    });

    if (transExists) {
      return res.status(404).json({
        success: false,
        message:
          "You have already made a successful transaction in the last hour. Please wait before making another transaction.",
      });
    }

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
    const { status } = data;

    const transaction = await Transaction.findOne({
      where: { orderId: razorpay_order_id },
    });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
        paymentSuccess: false,
      });
    }
    if (status === "captured") {
      await transaction.update({
        status: "Success",
        paymentId: razorpay_payment_id,
      });
    }
    res.status(200).json({
      success: true,
      message: "payment-successful",
      data: transaction,
      paymentSuccess: true,
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
    const event = req.body.event;
    const payload = req.body.payload;

    switch (event) {
      case "payment.captured":
        // TODO: Send Email of payment success to Customer
        console.log("Payment captured:", payload);
        break;
      case "order.paid": {
        let payment = payload.payment.entity;
        console.log("Order paid:", payload);
        let trans = await Transaction.findOne({
          where: { orderId: payment.order_id },
        });
        if (!trans) {
          return res
            .status(404)
            .json({ success: false, message: "Transaction not found" });
        }
        if (payment.status === "captured") {
          await trans.update({
            status: "Success",
            paymentId: payment.id,
          });
          let template = userMailTemplate(trans.name);
          let mailOptions = {
            to: trans.email,
            subject:
              "Your Registration for Skill Corner's Prompt Engineering Demo is Successful!",
            html: template,
          };
          await sendMail(mailOptions);
          let adminTemplate = adminMailTemplate(
            trans.name,
            trans.email,
            trans.mobile
          );
          let adminMailOptions = {
            to: envVars.adminMail,
            subject: "New Registration Alert – Prompt Engineering Demo Class",
            html: adminTemplate,
          };
          await sendMail(adminMailOptions);
          return res.status(200).json({
            success: true,
            message: "Payment successful",
            data: trans,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Payment Failed",
            data: trans,
          });
        }
      }
      default:
        console.log("Unhandled event:", event);
    }
    res
      .status(200)
      .json({ success: true, message: "Webhook processed successfully" });
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
