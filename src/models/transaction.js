"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      orderId: { type: DataTypes.STRING, allowNull: false },
      paymentId: { type: DataTypes.STRING, allowNull: true },
      amount: { type: DataTypes.STRING, allowNull: false },
      currency: { type: DataTypes.ENUM("INR", "USD"), defaultValue: "INR" },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 10],
            msg: "Mobile number should be 10 digits",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("Pending", "Success", "Failed"),
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
