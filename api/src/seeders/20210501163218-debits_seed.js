'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Debits',[
      {
        debit_number: 22222247,
        debit_type: "Tipo1",
        payment_id: 3,
        bank: 1
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Debits', null, {});
  }
};
