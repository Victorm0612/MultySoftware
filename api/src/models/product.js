'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    pro_description: DataTypes.TEXT,
    pro_image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    pro_status: DataTypes.BOOLEAN,
    percentage_tax: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};