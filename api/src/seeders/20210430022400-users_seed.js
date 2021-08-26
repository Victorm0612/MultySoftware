'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      //Ob1
      {
        document_type: 0,
        document_id: 1107530686,
        first_name: "Victor",
        last_name: "Vargas",
        gender: 'M',
        phone: '3166360275',
        birthday: new Date(),
        user_type: 0,
        user_status: true,
        email: 'rojas@gmail.com',
        password: '061299Victor'
      },
      {
        document_type: 0,
        document_id: 1118960875,
        first_name: "Jose",
        last_name: "Martinez",
        gender: 'M',
        phone: '3155237372',
        birthday: new Date(),
        user_type: 0,
        user_status: true,
        email: 'martinez@gmail.com',
        password: '061299Jose'
      },
      {
        document_type: 0,
        document_id: 1105245416,
        first_name: "Camilo",
        last_name: "Lozano",
        gender: 'M',
        phone: '3166890256',
        birthday: new Date(),
        user_type: 0,
        user_status: true,
        email: 'lozano@gmail.com',
        password: '061299Camilo'
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
