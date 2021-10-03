'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Restaurants', [
      {
        restaurant_name: "Restaurante Maestro",
        restaurant_address: "Restaurante Maestro",
        phone: "Restaurante Maestro",
        ini_attention_time: "00:00",
        final_attention_time: "01:00",
        restaurant_status: true,
      },
      {
        restaurant_name: "Ciudad de cali",
        restaurant_address: "Cra 41e2 20-10",
        phone: "3145232424",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },  
      {
        restaurant_name: "Elca Ney",
        restaurant_address: "Cra 50e1 30-30",
        phone: "3145232525",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },
      {
        restaurant_name: "Chimi nangos",
        restaurant_address: "Cra 6N 50-10",
        phone: "3145232626",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },
      {
        restaurant_name: "Aveni Dario",
        restaurant_address: "Cra 3N 24-13",
        phone: "3145232727",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
