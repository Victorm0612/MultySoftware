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
      user_status: 0,
      email: 'rojas@gmail.com',
      password: '061299Victor'
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
