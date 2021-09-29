import { sequelize } from "../models/index";
const models = require("../models/index");
const { Op } = require("sequelize");

export async function processMessage(req, res) {
  const { message } = req.body;

  if (message.includes("restaurantes")) {
    getRestaurants(res);
  } else if (message.includes("horarios")) {
    getRestaurantSchedule(res);
  } else if (message.includes("promociones")) {
    getProductsPromotions(res);
  } else if (message.includes("productoDia")) {
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

    if(products.length > 0) {
        let productsOk = new Array();
        
        for(const oneProduct of products){

            for(const oneDiscount of oneProduct.Discounts)
                if(oneDiscount.id != 1 && oneDiscount.discount_status == true){
                    productsOk.push(oneProduct);
                }
        }

        if(productsOk.length > 0){
            res.json({
                data: productsOk,
            })
        }

        res.json({
            message: "No promotions found for today"
        })

    }

  } catch (error) {
    res.status(404).json({
      message: "Something went wrong " + error,
    });
  }
}

export async function todaysProduct(res){

    try {

        const topProduct = await models.Product.findAll({
            group: ["Product.id"],
            include: [
                {
                    model: models.Sale,
                },
            ],
            attributes: [
                "id",
                [
                  sequelize.fn("count", sequelize.col(`"Sales->SaleItem"."product_id"`)),
                  "sells",
                ],
                "pro_name",
                "pro_description",
                "pro_image",
                "price",
                "category_id",
                "pro_status",
                "percentage_tax",
              ],
              order: sequelize.literal("sells DSC"),
              limit: 1,
        })
    
        if(topProduct.length > 0) {
            res.json({
                data: topProduct,
            })
        }
    
        res.status(404).json({
            message: "There was an error with your request",
        })
        
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong " + error,
        })
    }

}
