'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ingredients',[
      //Ob1
      {
        ingredient_name: "Pernil de pollo asado",
        price: "5000"
      },
      {
        ingredient_name: "Gaseosa 1Lt",
        price: "3500"
      },
      {
        ingredient_name: "Entrada papas",
        price: "10000"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
