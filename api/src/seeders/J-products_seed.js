'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products',[
      {
        pro_name: "ElPo llAsado",
        pro_description: "Almuerzo de Pollo asado",
        pro_image: "UnPolloasado",
        price: 18500,
        category_id: 3,
        discount_id: 1,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "LasPa pitas",
        pro_description: "Porcion de papas",
        pro_image: "UnasPapas",
        price: 10000,
        category_id: 2,
        discount_id: 3,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "ElCal Culeitor",
        pro_description: "Coca cola litro",
        pro_image: "UnaCocaCola",
        price: 3500,
        category_id: 1,
        discount_id: 3,
        pro_status: true,
        percentage_tax: 19,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
