'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pro_name : {
        type: Sequelize.STRING
      },
      pro_description: {
        type: Sequelize.TEXT
      },
      pro_image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'SET NULL',
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      pro_status: {
        type: Sequelize.BOOLEAN
      },
      percentage_tax: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};