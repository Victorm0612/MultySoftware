'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
    }
  };
  Card.init({
    card_number: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    exp_date: DataTypes.DATE,
    bank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};