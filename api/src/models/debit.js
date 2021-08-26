'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Debit.init({
    debit_number: DataTypes.STRING,
    debit_type: DataTypes.STRING,
    payment_id: DataTypes.INTEGER,
    bank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Debit',
  });
  return Debit;
};