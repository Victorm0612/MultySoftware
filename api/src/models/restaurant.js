"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {}
  }
  Restaurant.init(
    {
      restaurant_name: DataTypes.STRING,
      restaurant_address: DataTypes.STRING,
      phone: DataTypes.STRING,
      attention_time: DataTypes.STRING,
      restaurant_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
