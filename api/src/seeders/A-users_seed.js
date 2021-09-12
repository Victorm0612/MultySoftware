"use strict";

const bcrypt = require("bcryptjs");
const seed = (module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        //Ob1
        {
          document_type: 1,
          document_id: 1107530686,
          first_name: "Victor",
          last_name: "Vargas",
          gender: "M",
          phone: "3166360275",
          birthday: new Date("1999-02-16"),
          user_type: 3,
          user_status: true,
          email: "rojas@gmail.com",
          password: await seed.encryptPassword("victor1234"),
        },
        {
          document_type: 1,
          document_id: 1118960875,
          first_name: "Jose",
          last_name: "Martinez",
          gender: "M",
          phone: "3155237372",
          birthday: new Date("1999-05-18"),
          user_type: 3,
          user_status: true,
          email: "martinez@gmail.com",
          password: await seed.encryptPassword("jose1234"),
        },
        {
          document_type: 1,
          document_id: 1105245416,
          first_name: "Camilo",
          last_name: "Lozano",
          gender: "M",
          phone: "3166890256",
          birthday: new Date("1999-12-10"),
          user_type: 3,
          user_status: true,
          email: "lozano@gmail.com",
          password: await seed.encryptPassword("camilo1234"),
        },
        {
          document_type: 1,
          document_id: 1111111111,
          first_name: "Admin",
          last_name: "Base",
          gender: "M",
          phone: "3133333333",
          birthday: new Date("1999-12-10"),
          user_type: 3,
          user_status: true,
          email: "admin@gmail.com",
          password: await seed.encryptPassword("admin1234"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },

  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
});
