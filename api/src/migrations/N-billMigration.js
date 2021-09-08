'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nit: {
        type: Sequelize.INTEGER
      },
      sale_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Sales',
          key: 'id'
        }
      },
      payment_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Payments',
          key: 'id'
        }
      },
      bill_time: {
        type: Sequelize.TIME
      },
      bill_date: {
        type: Sequelize.DATE
      },
      subtotal: {
        type: Sequelize.DOUBLE
      },
      totalIva: {
        type: Sequelize.DOUBLE
      },
      total_discount: {
        type: Sequelize.DOUBLE
      },
      total_payment: {
        type: Sequelize.DOUBLE
      },
      bill_status: {
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
    await queryInterface.dropTable('Bills');
  }
};