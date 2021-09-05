'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sales',[
      {
      sale_date: "28/04/2021",
      sale_time: "18:05",
      docId: 1107530686,
      restaurant_id: 2,
      sale_status: true
    },
    {
      sale_date: "29/04/2021",
      sale_time: "13:21",
      docId: 1105245416,
      restaurant_id: 1,
      sale_status: true
    },
    {
      sale_date: "27/04/2021",
      sale_time: "16:33",
      docId: 1105245416,
      restaurant_id: 3,
      sale_status: true
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};
