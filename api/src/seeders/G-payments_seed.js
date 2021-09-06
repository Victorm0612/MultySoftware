'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments',[
      {
        pay_description: "1 Pernil pollo asado, 1 cocacola litro",
        pay_date: "28/04/2021",
        pay_time: "17:45",
        pay_type: "Credito",
        amount: 18500,
        pay_status: true
      },
      {
        pay_description: "1 Porcion Papas",
        pay_date: "29/04/2021",
        pay_time: "10:30",
        pay_type: "Debito",
        amount: 10000,
        pay_status: true
      },
      {
        pay_description: "1 cocacola litro",
        pay_date: "29/04/2021",
        pay_time: "10:30",
        pay_type: "Efectivo",
        amount: 3500,
        pay_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
