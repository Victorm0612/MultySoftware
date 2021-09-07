"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Credit_Pay extends Model {
    static associate(models) {
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Credit_Pay - Card ==========
      //Card have many Credit_Pay
      models.Card.hasMany(models.Credit_Pay, {
        as: "CreditCard",
        foreignKey: "card_number",
      });

      //Credit_pay belongs to one Card
      models.Credit_Pay.belongsTo(models.Card, {
        as: "CreditCard",
        foreignKey: "card_number",
        targetKey: "card_number"
      });
    }
  }
  Credit_Pay.init(
    {
      approval_number: DataTypes.INTEGER,
      fees_number: DataTypes.INTEGER,
      card_number: DataTypes.STRING,
      payment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Credit_Pay",
    }
  );
  return Credit_Pay;
};
