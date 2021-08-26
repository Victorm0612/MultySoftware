'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sale, { foreignKey: 'restaurant_id', sourceKey: 'id'})
      models.Sale.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', sourceKey: 'id'})
    }
  };
  Restaurant.init({
    restaurant_name: DataTypes.STRING,
    restaurant_address: DataTypes.STRING,
    phone: DataTypes.STRING,
    attention_time: DataTypes.STRING,
    restaurant_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};