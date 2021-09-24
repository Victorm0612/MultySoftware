"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debit_Pay extends Model {
    static associate(models) {
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Debit_Pay - Card ==========
      //Card have many Debit_Pay
      models.Card.hasMany(models.Debit_Pay, {
        as: "DebitCard",
        foreignKey: "card_number",
      });

      //Debit_pay belongs to one Card
      models.Debit_Pay.belongsTo(models.Card, {
        as: "DebitCard",
        foreignKey: "card_number",
        targetKey: "card_number"
      });
    }
  }
  Debit_Pay.init(
    {
      debit_type: DataTypes.STRING,
      card_number: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Debit_Pay",
    }
  );
  return Debit_Pay;
};
