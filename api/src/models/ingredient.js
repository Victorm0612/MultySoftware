'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.IngredientItem, { foreignKey: 'ingredient_id', sourceKey: 'id'})
      models.IngredientItem.hasMany(models.Ingredient, { foreigntKey: 'ingredient_id', sourceKey: 'id'} )
    }
  };
  Ingredient.init({
    ingredient_name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};