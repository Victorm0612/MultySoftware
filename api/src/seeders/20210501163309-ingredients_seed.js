'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ingredients',[
      //Ob1
      {
        ingredient_name: "Sal",
        price: "500"
      },
      {
        ingredient_name: "Pimienta",
        price: "800"
      },
      {
        ingredient_name: "Salsa bbq",
        price: "2000"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
