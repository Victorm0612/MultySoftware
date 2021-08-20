'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.SaleItem, { foreignKey: 'sale_id', sourceKey: 'id' })
      models.SaleItem.belongsToOne(models.Sale, { foreignKey: 'sale_id', sourceKey: 'id'})
    }
  };
  Sale.init({
    sale_date: DataTypes.DATE,
    sale_time: DataTypes.TIME,
    docId: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    sale_status: DataTypes.BOOLEAN    
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};