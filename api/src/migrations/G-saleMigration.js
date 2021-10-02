'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sale_date: {
        type: Sequelize.DATE
      },
      sale_time: {
        type: Sequelize.TIME
      },
      docId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'document_id'
        }
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Restaurants',
          key: 'id'
        }
      },
      sale_status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Sales');
  }
};