"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    static associate(models) {}
  }
  Promo.init(
    {
      ini_date: DataTypes.DATE,
      final_date: DataTypes.DATE,
      promo_name: DataTypes.STRING,
      promo_description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Promo",
    }
  );
  return Promo;
};
