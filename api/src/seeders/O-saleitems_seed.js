'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SaleItems', [
      {
        sale_id: 1,
        amount: 1,
        totalIva: 0,
        subtotal: 22300,
        item_total: 1,
        total_discount: 4000,
        product_id: 1
      },
      {
        sale_id: 2,
        amount: 1,
        totalIva: 0,
        subtotal: 10000,
        item_total: 1,
        total_discount: 0,
        product_id: 2
      },
      {
        sale_id: 3,
        amount: 2,
        totalIva: 0,
        subtotal: 0,
        item_total: 1,
        total_discount: 0,
        product_id: 3
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SaleItems', null, {})
  }
};
