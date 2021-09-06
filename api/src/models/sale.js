'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
   
    static associate(models) {
      
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
      */

      //========== Restaurant - Sale ==========
      //Sale have one restaurant
      models.Sale.belongsTo(models.Restaurant, { as: "RestaurantSales", foreignKey: "restaurant_id"})

      //Restaurant have many Sale
      models.Restaurant.hasMany(models.Sale, { as: "RestaurantSales", foreignKey: "restaurant_id"})
      
      //========== SaleItem - Sale ==========
      //SaleItems belongs to one Sale
      models.SaleItem.belongsTo(models.Sale, {as: 'SaleItems', foreignKey: "sale_id"})

      //Sale have many SaleItems
      models.Sale.hasMany(models.SaleItem, {as: "SaleItems", foreignKey: "sale_id"})

      //Sale have many Product
      models.Sale.belongsToMany(models.Product, { as: "SaleProduct", foreignKey: "sale_id", through: models.SaleItem})

      //Product have many Sale
      models.Product.belongsToMany(models.Sale, { as: "SaleProduct", foreignKey: "product_id", through: models.SaleItem})
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