'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pay_description: {
        type: Sequelize.TEXT
      },
      pay_date: {
        type: Sequelize.DATE
      },
      pay_time: {
        type: Sequelize.TIME
      },
      payed_status: {
        type: Sequelize.BOOLEAN
      },
      amount: {
        type: Sequelize.INTEGER
      },
      pay_status: {
        type: Sequelize.BOOLEAN
      },
      bill_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Bills',
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
    await queryInterface.dropTable('Payments');
  }
};