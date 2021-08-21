'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bill.init({
    nit: DataTypes.INTEGER,
    sale_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    bill_time: DataTypes.TIME,
    bill_date: DataTypes.DATE,
    subtotal: DataTypes.DOUBLE,
    totalIva: DataTypes.DOUBLE,
    total_discount: DataTypes.DOUBLE,
    total_payment: DataTypes.DOUBLE,
    bill_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};