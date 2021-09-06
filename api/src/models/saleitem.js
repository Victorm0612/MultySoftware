'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleItem extends Model {

    /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
      */

    static associate(models) {
      
    }
  };
  SaleItem.init({
    sale_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    totalIva: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    item_total: DataTypes.INTEGER,
    total_discount: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SaleItem',
  });
  return SaleItem;
};