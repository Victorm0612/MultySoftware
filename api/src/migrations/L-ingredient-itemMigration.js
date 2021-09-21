'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('IngredientItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ingredient_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        foreignKey: true,
        references: {
          model: 'Ingredients',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('IngredientItems');
  }
};