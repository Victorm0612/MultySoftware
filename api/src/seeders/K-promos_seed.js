'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Promos', [
      {
        ini_date: "01/01/2021",
        final_date: "01/01/2050",
        promo_name: "No promo",
        promo_description: "No hay promo por ahora"
      },
      {
        ini_date: "01/05/2021",
        final_date: "01/06/2021",
        promo_name: "Promo mitad de año",
        promo_description: "Participa en la rifa de un air fryer"
      },
      {
        ini_date: "01/10/2021",
        final_date: "01/01/2022",
        promo_name: "Promo final de año",
        promo_description: "Llevate una postal de navidad con tu compra"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Promos', null, {});
  }
};
