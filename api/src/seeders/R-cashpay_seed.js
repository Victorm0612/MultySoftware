'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cash_Pays',[
      {        
        payment_id: 3,
        amount: 3500,
        payer_id: "1118960875"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cash_Pays', null, {});
  }
};
