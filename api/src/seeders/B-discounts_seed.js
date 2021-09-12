'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Discounts',[
      {
        discount_name: 'No descuento',
        discount_description: 'Sin descuento',
        ini_date: '28/04/2021',
        final_date: '01/01/2050',
        discount_value: 0,
        discount_status: true        
      },
      {
        discount_name: "Descuento de 50%",
        discount_description: "Descuento de 50% en la segunda unidad que lleves de pollo asado",
        ini_date: "15/04/2021",
        final_date: '30/04/2021',        
        discount_value: 50,
        discount_status: false
      },
      {
        discount_name: "Descuento de 15%",
        discount_description: 'Descuento de 15% si llevas Coca cola y 1 pollo asado',
        ini_date: '30/04/2021',
        final_date: '10/05/2021',
        discount_value: 15,
        discount_status: true   
      },
      {
        discount_name: 'Descuento de 5%',
        discount_description: 'Descuento de 5% a todos los estudiantes que presenten su carnet estudiantil',
        ini_date: '28/04/2021',
        final_date: '03/05/2021',
        discount_value: 5,
        discount_status: true        
      }      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Discounts', null, {});
  }
};
