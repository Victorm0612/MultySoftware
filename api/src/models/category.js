'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: 'category_id', sourceKey: 'id' })
      models.Product.belongsTo(models.Category, { foreignKey: 'category_id', sourceKey: 'id' })      
    }
  };
  Category.init({
    cat_name: DataTypes.STRING,
    cat_description: DataTypes.TEXT,
    cat_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};