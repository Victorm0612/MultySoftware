'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Credit, { foreignKey: 'payment_id', sourceKey: 'id' })
      models.Credit.belongsToMany(models.Payment, { through: 'CreditPayment'})

      this.hasOne(models.Debit, { foreignKey: 'payment_id', sourceKey: 'id' })
      models.Debit.belongsToMany(models.Payment, { through: 'DebitPayment'})
      
    }
  };
  Payment.init({
    pay_description: DataTypes.TEXT,
    pay_date: DataTypes.DATE,
    pay_time: DataTypes.TIME,
    pay_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    pay_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};