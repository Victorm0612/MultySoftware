"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Payment - Credit_Pay ==========
      //Credit_Pay have one Payment
      models.Credit_Pay.belongsTo(models.Payment, {
        as: "CreditPayment",
        foreignKey: "payment_id",
      });

      //Payment belongs to one Credit_Pay
      models.Payment.hasOne(models.Credit_Pay, {
        as: "CreditPayment",
        foreignKey: "payment_id",
      });

      //========== Payment - Cash_Pay ==========
      //Cash_pay have one Payment
      models.Cash_Pay.belongsTo(models.Payment, {
        as: "CashPayment",
        foreignKey: "payment_id",
      });

      //Payment belongs to one Cash_Pay
      models.Payment.hasOne(models.Cash_Pay, {
        as: "CashPayment",
        foreignKey: "payment_id",
      });

      //========== Payment - Debit_Pay ==========
      //Debit_Pay have one Payment
      models.Debit_Pay.belongsTo(models.Payment, {
        as: "DebitPayment",
        foreignKey: "payment_id",
      });

      //Payment belongs to one Debit_Pay
      models.Payment.hasOne(models.Debit_Pay, {
        as: "DebitPayment",
        foreignKey: "payment_id",
      });
    }
  }
  Payment.init(
    {
      pay_description: DataTypes.TEXT,
      pay_date: DataTypes.DATE,
      pay_time: DataTypes.TIME,
      pay_type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      pay_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
