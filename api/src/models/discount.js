"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {}
  }
  Discount.init(
    {
      title: DataTypes.STRING,
      dis_description: DataTypes.TEXT,
      ini_date: DataTypes.DATE,
      final_date: DataTypes.DATE,
      discount_status: DataTypes.BOOLEAN,
      dis_value: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
