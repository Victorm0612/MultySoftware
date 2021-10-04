"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Restaurant - Sale ==========
      //Sale have one restaurant
      models.Sale.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
      });

      //Restaurant have many Sale
      models.Restaurant.hasMany(models.Sale, {
        foreignKey: "restaurant_id",
        onDELETE: 'CASCADE',
        allowNull: false,
        hooks: true,
      });

      //========== Sale - Product ==========
      //Sale have many Product
      models.Sale.belongsToMany(models.Product, {
        foreignKey: "sale_id",
        through: models.SaleItem,
      });

      //Product have many Sale
      models.Product.belongsToMany(models.Sale, {
        foreignKey: "product_id",
        through: models.SaleItem,
      });

       //========== SaleItem - Sale ==========
      //SaleItems belongs to one Sale
      models.SaleItem.belongsTo(models.Sale, {
        foreignKey: "sale_id",
      });

      //Sale have many SaleItems
      models.Sale.hasMany(models.SaleItem, {
        foreignKey: "sale_id",
      });
    }
  }
  Sale.init(
    {
      sale_date: DataTypes.DATE,
      sale_time: DataTypes.TIME,
      docId: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      sale_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Sale",
    }
  );
  return Sale;
};
