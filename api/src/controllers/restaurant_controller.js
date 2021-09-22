const models = require("../models/index");
import sequelize from "sequelize";

export async function getRestaurants(req, res) {
  try {
    const restaurants = await models.Restaurant.findAll();
    res.json({
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function getOneRestaurant(req, res) {
  const { id } = req.params;
  try {
    const oneRestaurant = await models.Restaurant.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: oneRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const {
    restaurant_name,
    restaurant_address,
    phone,
    attention_time,
    restaurant_status,
  } = req.body;
  try {
    let newRestaurant = await models.Restaurant.create({
      restaurant_name,
      restaurant_address,
      phone,
      attention_time,
      restaurant_status,
    });
    if (newRestaurant) {
      res.json({
        message: "SUCCESS!",
        data: newRestaurant,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateRestaurant(req, res) {
  const { id } = req.params;
  const {
    restaurant_name,
    restaurant_address,
    phone,
    attention_time,
    restaurant_status,
  } = req.body;
  const restaurantFound = await models.Restaurant.findAll({
    attributes: [
      "restaurant_name",
      "restaurant_address",
      "phone",
      "attention_time",
      "restaurant_status",
    ],
    where: {
      id: id,
    },
  });
  if (restaurantFound.length > 0) {
    restaurantFound.forEach(async (restaurantFound) => {
      await models.Restaurant.update(
        {
          restaurant_name,
          restaurant_address,
          phone,
          attention_time,
          restaurant_status,
        },
        {
          where: {
            id: id,
          },
        }
      );
    });
  }
  return res.json({
    message: "Restaur updated succesfully",
  });
}

export async function deleteRestaurant(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Restaurant.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Restaurants deleted succesfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Restaurant",
    });
  }
}

export async function mostSeller(req, res) {
  const mostSeller = await models.Sale.findAll({
    attributes: [
      "restaurant_id",
      [sequelize.fn("count", sequelize.col("restaurant_id")), "sells"],
    ],
    group: "restaurant_id",
    order: sequelize.literal("sells DESC"),
    limit: 1,
  });

  res.json({
    data: mostSeller,
  });
}

export async function lessSeller(req, res) {
  const lestSeller = await models.Sale.findAll({
    attributes: [
      "restaurant_id",
      [sequelize.fn("count", sequelize.col("restaurant_id")), "sells"],
    ],
    group: "restaurant_id",
    order: sequelize.literal("sells ASC"),
    limit: 1,
  });
}
