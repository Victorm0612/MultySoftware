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
      //Credit_Pay belongs to Payment
      models.Credit_Pay.belongsTo(models.Payment, {
        foreignKey: "payment_id",
      });

      //Payment have Credit_Pay
      models.Payment.hasOne(models.Credit_Pay, {
        onDELETE: 'CASCADE',
        allowNull: false,
        hooks: true,
        foreignKey: "payment_id",
      });

      //========== Payment - Cash_Pay ==========
      //Cash_pay belongs to one Payment
      models.Cash_Pay.belongsTo(models.Payment, {
        foreignKey: "payment_id",
      });

      //Payment have one Cash_Pay
      models.Payment.hasOne(models.Cash_Pay, {
        onDELETE: 'CASCADE',
        allowNull: false,
        hooks: true,
        foreignKey: "payment_id",
      });

      //========== Payment - Debit_Pay ==========
      //Debit_Pay belongs to one Payment
      models.Debit_Pay.belongsTo(models.Payment, {
        foreignKey: "payment_id",
      });

      //Payment have one Debit_Pay
      models.Payment.hasOne(models.Debit_Pay, {
        onDELETE: 'CASCADE',
        allowNull: false,
        hooks: true,
        foreignKey: "payment_id",
      });

      //========== Payment - Bill ==========
      //Bill belongs to Payment
      models.Bill.hasOne(models.Payment, { foreignKey: "bill_id" });

      //Payment have one Bill
      models.Payment.belongsTo(models.Bill, { foreignKey: "bill_id" });
    }
  }
  Payment.init(
    {
      pay_description: DataTypes.TEXT,
      pay_date: DataTypes.DATE,
      pay_time: DataTypes.TIME,
      payed_status: DataTypes.BOOLEAN,
      amount: DataTypes.INTEGER,
      pay_status: DataTypes.BOOLEAN,
      bill_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
