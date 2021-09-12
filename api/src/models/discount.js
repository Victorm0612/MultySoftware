"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {}
  }
  Discount.init(
    {
      discount_name: DataTypes.STRING,
      discount_description: DataTypes.TEXT,
      ini_date: DataTypes.DATE,
      final_date: DataTypes.DATE,
      discount_value: DataTypes.DOUBLE,
      discount_status: DataTypes.BOOLEAN      
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
