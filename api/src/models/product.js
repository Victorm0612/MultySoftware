'use strict';
const { TransferWithinAStationOutlined } = require('@material-ui/icons');
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
      this.hasMany(models.Ingredient, { as: 'IngredientItem' })
      //models.IngredientItem.hasMany(models.Product, { foreigntKey: 'ingredient_id', sourceKey: 'id'} )

      this.hasMany(models.Promo, { as: 'PromoItem' })
      //models.PromoItem.hasMany(models.Product, { foreigntKey: 'product_id', sourceKey: 'id'} )
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