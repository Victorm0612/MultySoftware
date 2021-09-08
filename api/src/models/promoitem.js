"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PromoItem extends Model {
    static associate(models) {}
  }
  PromoItem.init(
    {
      promo_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PromoItem",
    }
  );
  return PromoItem;
};
