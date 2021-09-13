import { sequelize } from "../models/index";

const models = require("../models/index");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

export async function getProducts(req, res) {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          model: models.Category,
          attributes: ["id", "cat_name"],
        },
        {
          model: models.Discount,
          attributes: ["id", "discount_name", "discount_value"],
        },
        {
          model: models.Ingredient,
          attributes: ["id", "ingredient_name", "price"],
        },
      ],
    });
    res.json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getProductsByName(req, res) {
  try {
    const products = await models.Product.findAll({
      where: {
        pro_description: "Un producto",
      },
    });
    res.json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const {
    pro_name,
    pro_description,
    pro_image,
    price,
    category_id,
    pro_status,
    percentage_tax,
    discounts,
    ingredients,
  } = req.body;

  //Errors handling
  let { ingredientError, discountError } = false;

  try {
    let newProduct = await models.Product.create({
      pro_name,
      pro_description,
      pro_image,
      price,
      category_id,
      pro_status,
      percentage_tax,
    });
    if (newProduct) {
      for (const oneDiscount of discounts) {
        const discount = await models.Discount.findOne({
          where: {
            id: oneDiscount.discount_id,
          },
        });

        if (discount) {
          newProduct.addDiscounts(discount);
        } else {
          discountError = true;
          break;
        }
      }

      for (const oneIngredient of ingredients) {
        const ingredient = await models.Ingredient.findOne({
          where: {
            id: oneIngredient.ingredient_id,
          },
        });

        if (ingredient) {
          newProduct.addIngredients(ingredient, {
            through: { amount: oneIngredient.amount },
          });
        } else {
          ingredientError = true;
          break;
        }
      }

      if (ingredientError && discountError) {
        res.json({ message: "There is an error with all the product" });
      } else if (ingredientError) {
        res.json({ message: "There is an error with the ingredient" });
      } else if (discountError) {
        res.json({ message: "There is an error with the discount" });
      } else {
        res.json({
          data: newProduct,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    pro_name,
    pro_description,
    pro_image,
    price,
    category_id,
    pro_status,
    percentage_tax,
  } = req.body;

  const productFound = await models.Product.findOne({
    attributes: [
      "pro_name",
      "pro_description",
      "pro_image",
      "price",
      "category_id",
      "pro_status",
      "percentage_tax",
    ],
    where: {
      id: id,
    },
  });
  if (productFound) {
    const update = await models.Product.update(
      {
        pro_name,
        pro_description,
        pro_image,
        price,
        category_id,
        pro_status,
        percentage_tax,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (update) {
      res.json({
        message: "Product updated successfully",
      });
    } else {
      res.status(404).json({
        message: "There was an error updating the product",
      });
    }
  } else {
    res.json({
      message: "Product not found",
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = models.Product.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      res.json({
        message: "product delected succesfully",
        count: deleteRowCount,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Product " + error,
      data: {},
    });
  }
}

export async function getTop20(req, res) {
  const allTopProducts = await models.Product.findAll({
    group: ["Product.id"],
    includeIgnoreAttributes: false,
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
    limit: 20,
  });

  if (allTopProducts.length > 0) {
    res.json({
      data: allTopProducts,
    });
  } else {
    res.status(404).json({
      message: "There was an error with your request",
    });
  }
}

export async function getBottom20(req, res) {
  const allBottomProducts = await models.Product.findAll({
    group: ["Product.id"],
    includeIgnoreAttributes: false,
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
    order: sequelize.literal("sells ASC"),
    limit: 20,
  });

  if (allBottomProducts.length > 0) {
    res.json({
      data: allBottomProducts,
    });
  } else {
    res.status(404).json({
      message: "There was an error with your request",
    });
  }
}

export async function last6Months(req, res) {
  const { id } = req.params;
  const actualMonth = new Date(Date.now());

  const last6Months = new Date(Date.now());
  last6Months.setMonth(actualMonth.getMonth() - 6);

  const allSells = await models.SaleItem.count({
    where: {
      product_id: id,
    },
    include: [
      {
        model: models.Sale,
        where: {
          sale_date: {
            [Op.between]: [last6Months, actualMonth],
          },
        },
      },
    ],
  });

  if (allSells > 0) {
    res.json({
      message: `For the product with the id ${id} were ${allSells} sells in the last 6 months.`,
    });
  } else {
    res.json({
      message: "No sells in the last 6 months.",
    });
  }
}
