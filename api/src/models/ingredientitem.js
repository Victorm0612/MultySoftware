'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IngredientItem extends Model {
    static associate(models) {
    }
  };
  IngredientItem.init({
    ingredient_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IngredientItem',
  });
  return IngredientItem;
};