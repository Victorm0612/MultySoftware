'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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