'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bills',[
      {
        nit: 33333345,
        sale_id: 1,
        payment_id: 1,
        bill_time: "18:09",
        bill_date: "28/04/2021",
        subtotal: 34000,
        totalIva: 2100,
        total_discount: 4000,
        total_payment: 32100,
        bill_status: true
      },
      {
        nit: 33333346,
        sale_id: 2,
        payment_id: 2,
        bill_time: "13:01",
        bill_date: "20/04/2021",
        subtotal: 48000,
        totalIva: 3000,
        total_discount: 5000,
        total_payment: 46000,
        bill_status: true
      },
      {
        nit: 33333346,
        sale_id: 3,
        payment_id: 3,
        bill_time: "17:45",
        bill_date: "25/04/2021",
        subtotal: 47000,
        totalIva: 5000,
        total_discount: 7000,
        total_payment: 45000,
        bill_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bills', null, {});
  }
};
