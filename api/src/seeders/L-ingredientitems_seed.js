'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('IngredientItems',[
      {
        ingredient_id: 1,
        product_id: 1,
        amount: 1
      },
      {
        ingredient_id: 2,
        product_id: 1,
        amount: 1
      },
      {
        ingredient_id: 3,
        product_id: 2,
        amount: 1
      },
      {
        ingredient_id: 2,
        product_id: 3,
        amount: 1
      }
    ])  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('IngredientItems', null, {})
  }
};
