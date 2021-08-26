'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Debits', {      
      debit_number: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.STRING
      },
      debit_type: {
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.INTEGER
      },
      bank: {
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
    await queryInterface.dropTable('Debits');
  }
};