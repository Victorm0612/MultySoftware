'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PromoItem, { foreignKey: 'promo_id', sourceKey: 'id'})
      models.PromoItem.hasMany(models.Promo, { foreigntKey: 'promo_id', sourceKey: 'id'} )
    }
  };
  Promo.init({
    ini_date: DataTypes.DATE,
    final_date: DataTypes.DATE,
    promo_name: DataTypes.STRING,
    promo_description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Promo',
  });
  return Promo;
};