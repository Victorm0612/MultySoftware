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
        restaurant_address: "Cra 85c ## 16-11, Cali, Valle del Cauca",
        phone: "3145232424",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },  
      {
        restaurant_name: "Elca Ney",
        restaurant_address: "Cl. 48 ## 86 - 133, Cali, Valle del Cauca",
        phone: "3145232525",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },
      {
        restaurant_name: "Chimi nangos",
        restaurant_address: "Avenida 4N # 8N - 10, Cali",
        phone: "3145232626",
        ini_attention_time: "07:00",
        final_attention_time: "22:00",
        restaurant_status: true,
      },
      {
        restaurant_name: "Aveni Dario",
        restaurant_address: "Cl. 9 ## 50B - 06, Cali, Valle del Cauca",
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
