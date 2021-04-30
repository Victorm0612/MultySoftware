'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {foreignKey: 'discount_id', sourceKey: 'id' })
      models.Product.belongsTo(models.Discount, { foreignKey: 'discount_id', sourceKey: 'id' })
    }
  };
  Discount.init({
    title: DataTypes.STRING,
    dis_description: DataTypes.TEXT,
    ini_date: DataTypes.DATE,
    final_date: DataTypes.DATE,
    discount_status: DataTypes.BOOLEAN,
    dis_value: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};