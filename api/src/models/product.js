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
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Product - Ingredient ==========
      //Product have many ingredients
      models.Product.belongsToMany(models.Ingredient, {
        foreignKey: "product_id",
        through: models.IngredientItem,
      });

      //Ingredients can be in many Products
      models.Ingredient.belongsToMany(models.Product, {
        foreignKey: "ingredient_id",
        through: models.IngredientItem,
      });

      //========== Product - Category ==========
      //Product have one Category
      models.Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });

      //Category have many Products
      models.Category.hasMany(models.Product, {
        foreignKey: "category_id",
      });

      //========== Product - Discount ==========
      //Product have many Discount
      models.Product.belongsToMany(models.Discount, {
        foreignKey: "product_id",
        through: models.ProductDiscount
      });

      //Discount have many Product
      models.Discount.belongsToMany(models.Product, {
        foreignKey: "discount_id",
        through: models.ProductDiscount
      });
    }
  }
  Product.init(
    {
      pro_name: DataTypes.STRING,
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
