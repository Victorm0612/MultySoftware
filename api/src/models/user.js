import bcrypt from "bcryptjs";

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      /**
       * @as Way to access in backend
       * @foreignKey The name of the column that haves the foreignKey
       * @targetKey The source value for foreignKey
      */

      /**
      * User have many sales
      */
      models.User.hasMany(models.Sale, { as: "SaleUser", foreignKey: "docId"});

      /**
       * Sales belongs to one user.
      */
      models.Sale.belongsTo(models.User, {as: "SaleUser", foreignKey: "docId", targetKey: "document_id"});
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

  User.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  User.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
  };

  return User;
};
