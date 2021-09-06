'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cash_Pay extends Model {
    
    static associate(models) {
      
      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey - default: id
       * @through The model that contains the many to many relationship
      */

      //========== Cash_Pay - User ==========
      //User have many Cash_Pay
      models.User.hasMany(models.Cash_Pay, {as: "CashPay", foreignKey: "payer_id"})

      //Cash_Pay belongs to one User
      models.Cash_Pay.belongsTo(models.User, {as: "CashPay", foreignKey: "payer_id"})

    }
  };
  Cash_Pay.init({
    payment_id: DataTypes.INTEGER,
    payer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cash_Pay',
  });
  return Cash_Pay;
};