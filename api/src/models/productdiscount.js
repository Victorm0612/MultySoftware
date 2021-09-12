'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDiscount extends Model {
    static associate(models) {
    }
  };
  ProductDiscount.init({
    discount_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDiscount',
  });
  return ProductDiscount;
};