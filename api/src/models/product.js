"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {

      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
      */
      
      //========== Product - Ingredient ==========
      //Product have many ingredients
      models.Product.belongsToMany(models.Ingredient, { as: "IngredientProduct", foreignKey: "product_id", through: models.IngredientItem})

      //Ingredients can be in many Products
      models.Ingredient.belongsToMany(models.Product, { as: "IngredientProduct", foreignKey: "item_id", through: models.IngredientItem})

      //========== Product - Promo ==========
      //Product have Many Promo
      models.Product.belongsToMany(models.Promo, { as: "ProductPromo", foreignKey: "product_id", through: models.PromoItem})

      //Promo have many Products
      models.Promo.belongsToMany(models.Product, { as: "ProductPromo", foreignKey: "promo_id", through: models.PromoItem})

      //========== Product - Category ==========
      //Product have one Category
      models.Product.belongsTo(models.Category, { as: "ProductCategory", foreignKey: "category_id"})

      //Category have many Products
      models.Category.hasMany(models.Product, { as: "ProductCategory", foreignKey: "category_id"})

      //========== Product - Discount ==========
      //Product have one Discount
      models.Product.belongsTo(models.Discount, { as: "ProductDiscount", foreignKey: "discount_id"})

      //Discount have many Product
      models.Discount.hasMany(models.Product, { as: "ProductDiscount", foreignKey: "discount_id"})
    }
  }
  Product.init(
    {
      pro_description: DataTypes.TEXT,
      pro_image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      discount_id: DataTypes.INTEGER,
      pro_status: DataTypes.BOOLEAN,
      percentage_tax: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
