'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Credit_Pays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      approval_number: {
        type: Sequelize.INTEGER
      },
      fees_number: {
        type: Sequelize.INTEGER
      },
      card_number: {
        type: Sequelize.STRING,
        foreignKey: true,
        references: {
          model: 'Cards',
          key: 'card_number',
        }
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Payments',
          key: 'id'
        }
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
    await queryInterface.dropTable('Credit_Pays');
  }
};