const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes");
const port = process.env.PORT || 3000;
const { errorHandler } = require("./src/utils/errorHandler");
const paymentController = require("./src/controllers/paymentController");
const { sequelize } = require("./src/models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.aihyderabad.in"],
    credentials: true,
  })
);

app.post("/v1/payment-webhook", paymentController.paymentWebHook);
app.use("/v1", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
});


