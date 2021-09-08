'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Banks',[
      //Ob1
      {
        bank_name: "Bancolombia"
      },
      //Ob2
      {
        bank_name: "Banco de bogotá"
      },
      //Ob3
      {
        bank_name: "Davivienda"
      },
      //Ob4
      {
        bank_name: "Banco caja social"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banks', null, {});
  }
};
