import { sequelize } from "../models/index";

const models = require("../models/index");
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
          attributes: ["id", "ingredient_name", "price", "amount"],
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

    for(const oneProduct of products) {
      const ingredients = await oneproduct.getIngredients()

      for(const oneIngredient of ingredients) {
        if(oneIngredient.amount == 0) {

          await models.Product.update(
            {
              pro_status: false,
            },
            {
              where: {
                id: oneProduct.id,
              }
            }
          )
        }
      }
    }

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

    const ingredients = product.getIngredients()

    for(const oneIngredient of ingredients) {
      if(oneIngredient.amount == 0) {
        await models.Product.update(
          {
            pro_status: false,
          },
          {
            where: {
              id: id,
            }
          }
        )
      }
    }

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
  let ingredientError = false;
  let discountError = false;

  //Arrays for handling errors
  let ingredientsOk = new Array();
  let discountsOk = new Array();

  try {
    /**
     * This for is in order to validate that the discounts are valid
     * if they're valid, then they're introduced on the @discountsOk array
     * if not, @discountError will be true, in order to send an appropiate error message
     */
    for (const oneDiscount of discounts) {
      const discount = await models.Discount.findOne({
        where: {
          id: oneDiscount.discount_id,
        },
      });

      if (discount) {
        discountsOk.push({ discount: discount });
      } else {
        discountError = true;
        break;
      }
    }

    /**
     * This for is in order to validate that the ingredients are valid
     * if they're valid, then they're introduced on the @ingredientsOk array
     * if not, @ingredientError will be true, in order to send an appropiate error message
     */
    for (const oneIngredient of ingredients) {
      const ingredient = await models.Ingredient.findOne({
        where: {
          id: oneIngredient.ingredient_id,
        },
      });

      if (ingredient) {
        if(ingredient.amount == 0 ) {
          ingredientError = true;
        }
        ingredientsOk.push({ ingredient, amount: oneIngredient.amount });
      } else {
        ingredientError = true;
        break;
      }
    }

    if (!(ingredientError && discountError)) {
      if (!ingredientError) {
        if (!discountError) {
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
            for (const oneIngredient of ingredientsOk) {
              newProduct.addIngredients(oneIngredient.ingredient, {
                through: { amount: oneIngredient.amount },
              });
            }

            for (const oneDiscount of discountsOk) {
              newProduct.addDiscounts(oneDiscount.discount);
            }

            res.json({
              message: "Product created successfully",
              data: newProduct,
            });
          }
        } else {
          res.json({
            message: "There was an error with the discounts",
          });
        }
      } else {
        res.json({
          message: "There was an error with the ingredients",
        });
      }
    } else {
      res.json({
        message: "There was an error with ingredients and discounts",
      });
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
    discounts,
    ingredients,
  } = req.body;

  //Errors handling
  let ingredientError = false;
  let discountError = false;

  //Arrays for handling errors
  let ingredientsOk = new Array();
  let discountsOk = new Array();

  try {
    /**
     * This for is in order to validate that the discounts are valid
     * if they're valid, then they're introduced on the @discountsOk array
     * if not, @discountError will be true, in order to send an appropiate error message
     */
    for (const oneDiscount of discounts) {
      const discount = await models.Discount.findOne({
        where: {
          id: oneDiscount.discount_id,
        },
      });

      if (discount) {
        discountsOk.push( discount.id );
      } else {
        discountError = true;
        break;
      }
    }

    /**
     * This for is in order to validate that the ingredients are valid
     * if they're valid, then they're introduced on the @ingredientsOk array
     * if not, @ingredientError will be true, in order to send an appropiate error message
     */
    for (const oneIngredient of ingredients) {
      const ingredient = await models.Ingredient.findOne({
        where: {
          id: oneIngredient.ingredient_id,
        },
      });

      if (ingredient) {
        ingredientsOk.push({
          ingredient: ingredient,
          amount: oneIngredient.amount,
        });
      } else {
        ingredientError = true;
        break;
      }
    }

    if (!(ingredientError && discountError)) {
      if (!ingredientError) {
        if (!discountError) {
          const productFound = await models.Product.findOne({
            where: {
              id: id,
            },
          });
          if (productFound) {

            const oldIngredients = await productFound.getIngredients()
            for(const ingredient of oldIngredients) {
              productFound.removeIngredient(ingredient)
            }

            for(const ingredient of ingredientsOk) {
              productFound.addIngredients(ingredient.ingredient, { through: { amount: ingredient.amount}})
            }

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

            productFound.setDiscounts(discountsOk)

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
            res.status(404).json({
              message: "Product not found",
            });
          }
        } else {
          res.json({
            message: "There was an error with the discounts",
          });
        }
      } else {
        res.json({
          message: "There was an error with the ingredients",
        });
      }
    } else {
      res.json({
        message: "There was an error with ingredients and discounts",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "There was an error updating the product " + error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Product.destroy({
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
