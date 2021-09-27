'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ingredients',[
      //Ob1
      {
        ingredient_name: "Pernil de pollo asado",
        price: "5000",
        amount: 200,
      },
      {
        ingredient_name: "Gaseosa 1Lt",
        price: "3500",
        amount: 350,
      },
      {
        ingredient_name: "Entrada papas",
        price: "10000",
        amount: 412,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
