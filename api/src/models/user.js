"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sale, {
        foreignKey: "docId",
        sourceKey: "document_id",
      });
      models.Sale.belongsTo(models.User, {
        foreignKey: "docId",
        sourceKey: "document_id",
      });
    }
  }
  User.init(
    {
      document_type: DataTypes.INTEGER,
      document_id: DataTypes.INTEGER,
      first_name: DataTypes.TEXT,
      last_name: DataTypes.TEXT,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthday: DataTypes.DATE,
      user_type: DataTypes.INTEGER,
      user_status: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
