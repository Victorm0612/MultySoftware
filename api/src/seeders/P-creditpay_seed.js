'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Credit_Pays',[
      {
        approval_number: 12345,
        fees_number: 10,
        card_number: "1221 2332 2442 5225",
        amount: 9500,
        payment_id: 1
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Credit_Pays', null, {});
  }
};
