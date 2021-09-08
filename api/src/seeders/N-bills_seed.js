'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bills',[
      {
        nit: 33333345,
        sale_id: 1,
        payment_id: 1,
        bill_time: "18:05",
        bill_date: "28/04/2021",
        subtotal: 18500,
        totalIva: 2100,
        total_discount: 0,
        total_payment: 32100,
        bill_status: true
      },
      {
        nit: 33333346,
        sale_id: 2,
        payment_id: 2,
        bill_time: "13:21",
        bill_date: "29/04/2021",
        subtotal: 10000,
        totalIva: 3000,
        total_discount: 0,
        total_payment: 46000,
        bill_status: true
      },
      {
        nit: 33333346,
        sale_id: 3,
        payment_id: 3,
        bill_time: "16:33",
        bill_date: "27/04/2021",
        subtotal: 3500,
        totalIva: 5000,
        total_discount: 0,
        total_payment: 45000,
        bill_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bills', null, {});
  }
};
