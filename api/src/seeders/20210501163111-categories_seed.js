'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',[
      {
        cat_name: "Bebidas",
        cat_description: "Bebidas incluidas en el menu",
        cat_status: true
      },
      {
        cat_name: "Entradas",
        cat_description: "Entradas para disfrutar",
        cat_status: true
      },
      {
        cat_name: "Pollo",
        cat_description: "Tipos de pollos incluidos en el menu",
        cat_status: true
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
