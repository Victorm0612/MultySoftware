'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    
    /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
    */

    static associate(models) {
      //========== Bill - Sale ==========
      //Bill belongs to one Sale
      models.Bill.belongsTo(models.Sale, { as: "SaleBill", foreignKey: "sale_id"})

      //Sale Have one Bill
      models.Sale.hasOne(models.Bill, { as: "SaleBill", foreignKey: "sale_id"})
      

      //========== Bill - Payment ==========
      //Bill have one Payment
      models.Bill.hasOne(models.Payment, { as: "BillPayment", foreignKey: "payment_id"})

      //Payment belongs to one Bill
      models.Payment.belongsTo(models.Bill, { as: "BillPayment", foreignKey: "payment_id"})

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