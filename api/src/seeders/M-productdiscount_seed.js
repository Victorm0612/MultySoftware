'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductDiscounts', [
      {
        discount_id: 2,
        product_id: 1,
      },
      {
        discount_id: 1,
        product_id: 2,
      },
      {
        discount_id: 1,
        product_id: 3,
      },
      {
        discount_id: 5,
        product_id: 4, 
      },
      {
        discount_id: 6,
        product_id: 4, 
      },
      {
        discount_id: 5,
        product_id: 5,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductDiscounts', null, {});
  }
};
