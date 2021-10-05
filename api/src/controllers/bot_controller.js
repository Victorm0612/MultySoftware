import { sequelize } from "../models/index";
const models = require("../models/index");
const { Op } = require("sequelize");

export async function processMessage(req, res) {
  const { message } = req.body;

  if (
    message.split(" ").includes("restaurantes") ||
    message.split(" ").includes("restaurante")
  ) {
    getRestaurants(res);
  } else if (
    message.split(" ").includes("horarios") ||
    message.split(" ").includes("horario")
  ) {
    getRestaurantSchedule(res);
  } else if (
    message.split(" ").includes("promociones") ||
    message.split(" ").includes("promocion")
  ) {
    getProductsPromotions(res);
  } else if (
    (message.split(" ").includes("producto") ||
      message.split(" ").includes("productos")) &&
    message.split(" ").includes("dia")
  ) {
    todaysProduct(res);
  }
}

export async function getRestaurants(res) {
  try {
    const restaurants = await models.Restaurant.findAll();
    res.json({
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getRestaurantSchedule(res) {
  try {
    const timeNow = new Date(Date.now());

    const schedules = await models.Restaurant.findAll({
      where: {
        [Op.and]: [
          { ini_attention_time: { [Op.lte]: timeNow } },
          { final_attention_time: { [Op.gte]: timeNow } },
        ],
      },
    });

    if (schedules.length > 0) {
      return res.json({
        data: schedules,
      });
    }

    res.json({
      message: "No restaurants are open now",
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong " + error,
    });
  }
}

export async function getProductsPromotions(res) {
  try {
    const today = new Date(Date.now());

    const products = await models.Product.findAll({
      include: [
        {
          model: models.Discount,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            [Op.and]: [
              { ini_date: { [Op.lte]: today } },
              { final_date: { [Op.gte]: today } },
            ],
          },
        },
      ],
    });

    if (products.length > 0) {
      let productsOk = new Array();

      for (const oneProduct of products) {
        for (const oneDiscount of oneProduct.Discounts)
          if (oneDiscount.id != 1 && oneDiscount.discount_status == true) {
            productsOk.push(oneProduct);
          }
      }

      if (productsOk.length > 0) {
        res.json({
          data: productsOk,
        });
      }

      res.json({
        message: "No promotions found for today",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong " + error,
    });
  }
}

export async function todaysProduct(res) {
  try {
    const actualHour = new Date(Date.now());
    const initialHour = new Date(Date.now());
    initialHour.setHours(0, 7, 0);

    const actualDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    const topProduct = await models.Product.findAll({
      includeIgnoreAttributes: false,
      include: [
        {
          model: models.Sale,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            [Op.and]: [
              {
                sale_time: {
                  [Op.between]: ["07:00", actualHour],
                },
                sale_date: actualDate,
              },
            ],
          },
        },
      ],

      attributes: {
        include: [
          [
            sequelize.fn(
              "COUNT",
              sequelize.col(`"Sales->SaleItem"."product_id"`)
            ),
            "count",
          ],
        ],
      },
      subQuery: false,
      limit: 1,
      group: ["Product.id"],
      order: sequelize.literal("count DESC"),
    });

    if (topProduct.length > 0) {
      return res.json({
        data: topProduct,
      });
    }

    const allProducts = await models.Product.findAll();
    const randomNumber = Math.floor(Math.random() * allProducts.length);

    return res.json({
      data: allProducts[randomNumber],
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong " + error,
    });
  }
}
