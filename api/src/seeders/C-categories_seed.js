'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',[
      {
        cat_name: "Bebidas",
        cat_description: "Bebidas incluidas para disfrutar con tu comida",
        cat_status: true
      },
      {
        cat_name: "Entradas",
        cat_description: "Entradas para disfrutar antes de una gran comida",
        cat_status: true
      },
      {
        cat_name: "Almuerzos",
        cat_description: "Tipos de almuerzos para disfrutar al medio dia",
        cat_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
