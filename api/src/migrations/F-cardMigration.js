'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cards', {
      card_number: {
      allowNull: false,        
      primaryKey: true,
      type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'document_id'
        }
      },      
      exp_date: {
        type: Sequelize.DATE
      },
      bank: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Banks',
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
    await queryInterface.dropTable('Cards');
  }
};