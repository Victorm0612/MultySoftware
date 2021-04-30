'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domicile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sale, { foreignKey: 'domicile_id', sourceKey: 'id' })
      models.Sale.belongsTo(models.Domicile, { foreignKey: 'domicile_id', sourceKey: 'id' })
    }
  };
  Domicile.init({
    domicile_name: DataTypes.STRING,
    domicile_address: DataTypes.STRING,
    phone: DataTypes.STRING,
    attention_time: DataTypes.STRING,
    domicile_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Domicile',
  });
  return Domicile;
};