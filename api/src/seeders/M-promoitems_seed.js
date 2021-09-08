'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PromoItems', [
      {
        promo_id: 2,
        product_id: 1,
        amount: 50
      },
      {
        promo_id: 1,
        product_id: 2,
        amount: 0
      },
      {
        promo_id: 1,
        product_id: 3,
        amount: 0
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PromoItems', null, {});
  }
};
