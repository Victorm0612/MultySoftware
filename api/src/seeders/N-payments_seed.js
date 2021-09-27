'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments',[
      {
        pay_description: "1 Pernil pollo asado, 1 cocacola litro",
        pay_date: "28/04/2021",
        pay_time: "17:45",
        payed_status: false,
        amount: 18500,
        pay_status: true,
        bill_id: 1
      },
      {
        pay_description: "1 Porcion Papas",
        pay_date: "29/04/2021",
        pay_time: "10:30",
        payed_status: false,
        amount: 10000,
        pay_status: true,
        bill_id: 2
      },
      {
        pay_description: "1 cocacola litro",
        pay_date: "29/04/2021",
        pay_time: "10:30",
        payed_status: false,
        amount: 3500,
        pay_status: true,
        bill_id: 3
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
