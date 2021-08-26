'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Discounts',[
      //Ob1
      {
        title: "Descuento de 50%",
        dis_description: "Descuento de 50% en la segunda unidad que lleves de pollo asado",
        ini_date: "15/04/2021",
        final_date: '30/04/2021',
        discount_status: false,
        dis_value: 50,
      },
      {
        title: "Descuento de 15%",
        dis_description: 'Descuento de 15% si llevas Coca cola y 1 pollo asado',
        ini_date: '30/04/2021',
        final_date: '10/05/2021',
        discount_status: true,
        dis_value: 15,
      },
      {
        title: 'Descuento de 5%',
        dis_description: 'Descuento de 5% a todos los estudiantes que presenten su carnet estudiantil',
        ini_date: '28/04/2021',
        final_date: '03/05/2021',
        discount_status: true,
        dis_value: 5,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Discounts', null, {});
  }
};
