"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
       * @belongsTo is the model that have the column with the foreignKey
       * @hasOne or @hasMany is the model that have the source value for the foreignKey
       */

      //========== Bill - Sale ==========
      //Bill belongs to one Sale
      models.Bill.belongsTo(models.Sale, {
        foreignKey: "sale_id",
      });

      //Sale Have one Bill
      models.Sale.hasOne(models.Bill, {
        foreignKey: "sale_id",
        onDELETE: 'CASCADE',
        allowNull: false,
        hooks: true,
      });
    }
  }
  Bill.init(
    {
      nit: DataTypes.INTEGER,
      sale_id: DataTypes.INTEGER,
      bill_time: DataTypes.TIME,
      bill_date: DataTypes.DATE,
      subtotal: DataTypes.DOUBLE,
      totalIva: DataTypes.DOUBLE,
      total_discount: DataTypes.DOUBLE,
      total_payment: DataTypes.DOUBLE,
      bill_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
