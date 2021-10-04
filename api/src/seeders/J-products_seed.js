"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        pro_name: "Pollo asado",
        pro_description: "Almuerzo de Pollo asado",
        pro_image:
          "https://www.elespectador.com/resizer/bDTQsp0uz7EL5OpVkZDinXzDd2E=/1200x675/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/2F4WF2CH7BC4DCCLMRBGS34KVQ.jpg",
        price: 18500,
        category_id: 3,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "PapasChicks",
        pro_description: "Porcion de papas",
        pro_image:
          "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/elgranchef/C/Como-hacer-papas-fritas-crujientes-000.jpg",
        price: 10000,
        category_id: 2,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "CocaCola personal",
        pro_description: "Coca cola litro",
        pro_image:
          "https://pizzeriacarpaneto.com/wp-content/uploads/2020/07/cocacola.jpg",
        price: 3500,
        category_id: 1,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "Gato feli",
        pro_description: "Un gato muy feli",
        pro_image:
          "https://infomascota.com/wp-content/uploads/2020/05/gato-gracioso-332x375.jpg",
        price: 28000,
        category_id: 1,
        pro_status: true,
        percentage_tax: 19,
      },
      {
        pro_name: "Gato asustao",
        pro_description: "Un gato muy asustao",
        pro_image:
          "https://bbl-bdb.s3.amazonaws.com/collections/images/gato-asustado.png",
        price: 17000,
        category_id: 1,
        pro_status: true,
        percentage_tax: 19,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
