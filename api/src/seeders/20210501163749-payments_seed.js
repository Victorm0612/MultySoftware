'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments',[
      {
        pay_description: "1 pollo asado, 2 cocacola litro",
        pay_date: "28/04/2021",
        pay_time: "17:45",
        amount: 22300,
        pay_status: true
      },
      {
        pay_description: "1 pollo asado, 1 cocacola litro",
        pay_date: "29/04/2021",
        pay_time: "10:30",
        amount: 18500,
        pay_status: true
      },
      {
        pay_description: "2 pollo asado, 2 cocacola litro, 3 porcion de papa ",
        pay_date: "30/04/2021",
        pay_time: "11:51",
        amount: 41500,
        pay_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
