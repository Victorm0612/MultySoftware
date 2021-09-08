"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) { }
  }
  Bank.init(
    {
      bank_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bank",
    }
  );
  return Bank;
};
