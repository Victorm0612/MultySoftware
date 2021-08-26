'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Credits',[
      {
        credit_number: 11111145,
        approval_number: 1,
        fees_number: 15,
        amount: 25000,
        payment_id: 1,
        bank: 1
      },
      {
        credit_number: 11111146,
        approval_number: 2,
        fees_number: 18,
        amount: 19000,
        payment_id: 2,
        bank: 2
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Credits', null, {});
  }
};
