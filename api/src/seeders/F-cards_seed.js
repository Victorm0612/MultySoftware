'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards',[
      {
        card_number: "1221 2332 2442 5225",
        owner_id: 1107530686,
        exp_date: "03/01/24",
        card_type: "Debito",
        bank: 1,
      },
      {
        card_number: "8778 8998 8558 3223",
        owner_id: 1118960875,
        exp_date: "03/01/25",
        card_type: "Credito",
        bank: 2,
      },
      {
        card_number: "2442 1881 4334 4554",
        owner_id: 1105245416,
        exp_date: "03/01/26",
        card_type: "Credito",
        bank: 3,
      },
      {
        card_number: "3223 6556 4224 9119",
        owner_id: 1107530686,
        exp_date: "03/01/27",
        card_type: "Debito",
        bank: 4,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
