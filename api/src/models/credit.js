'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Payment, { foreignKey: 'payment_id'})
    }
  };
  Credit.init({
    credit_number: DataTypes.STRING,
    approval_number: DataTypes.INTEGER,
    fees_number: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    bank: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Credit',
  });
  return Credit;
};