'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Debit_Pays',[
      {
        debit_type: "Cuenta Ahorros",
        card_number: "2442 1881 4334 4554",
        amount: 8000,
        payment_id: 2
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Debit_Pays', null, {});
  }
};
