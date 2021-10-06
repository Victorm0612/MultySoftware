const models = require("../models/index");
const { Op, json } = require("sequelize");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getSales(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (user.user_type === 1) {
      const sales = await models.Sale.findAll({
        where: {
          docId: user.document_id,
        },
        include: [
          {
            model: models.Restaurant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: models.Product,
            through: { attributes: { exclude: ["createdAt", "updatedAt"] } },
          },
          {
            model: models.Bill,
            attributes: { attributes: { exclude: ["createdAt", "updatedAt"] } },
          },
        ],
      });

      return res.json({
        data: sales,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const sales = await models.Sale.findAll({
        where: {
          restaurant_id: user.user_restaurant,
        },
        include: [
          {
            model: models.User,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: models.Restaurant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: models.Product,
            through: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: models.Bill,
            attributes: { attributes: { exclude: ["createdAt", "updatedAt"] } },
          },
        ],
      });

      return res.json({
        data: sales,
      });
    }
    const salesAdm = await models.Sale.findAll({
      include: [
        {
          model: models.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Restaurant,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Product,
          through: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Bill,
          attributes: { attributes: { exclude: ["createdAt", "updatedAt"] } },
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({
      data: salesAdm,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneSale(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const saleFound = await models.Sale.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: models.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Restaurant,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Product,
          through: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Bill,
          attributes: { attributes: { exclude: ["createdAt", "updatedAt"] } },
        },
      ],
    });

    if (!saleFound) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    if (user.user_type === 1) {
      if (saleFound.docId != user.document_id) {
        return res.status(403).json({
          message: "You are not allowed to do that",
        });
      }
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (saleFound.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You are not allowed to do that",
        });
      }
    }

    res.json({
      data: saleFound,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const { sale_date, sale_time, docId, restaurant_id, sale_status, products } =
    req.body;

  let productError = false;
  let ingredientError = false;

  let productsOk = new Array();

  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You can't create sales for a different restaurant",
        });
      }
    }

    for (const oneProduct of products) {
      const product = await models.Product.findOne({
        where: {
          id: oneProduct.product_id,
        },
      });

      if (product) {
        const ingredients = await product.getIngredients({
          joinTableAttributes: ["amount"],
        });
        for (const oneIngredient of ingredients) {
          const finalAmount =
            oneIngredient.amount -
            oneProduct.amount * oneIngredient.IngredientItem.amount;

          if (finalAmount < 0) {
            ingredientError = true;
            break;
          }
        }

        productsOk.push({ product: product, amount: oneProduct.amount });
      } else {
        productError = true;
        break;
      }
    }

    if (!productError) {
      if (!ingredientError) {
        let newSale = await models.Sale.create({
          sale_date,
          sale_time,
          docId,
          restaurant_id,
          sale_status,
        });

        if (newSale) {
          //Variables for Bill
          let totalIvaBill = 0;
          let subtotalBill = 0;
          let total_discountBill = 0;
          let item_totalBill = 0;

          for (const oneProduct of productsOk) {
            const today = new Date(Date.now());

            //Getting discounts of the product that applies for today's date
            const discount = await models.Discount.findAll({
              include: {
                model: models.Product,
                where: {
                  id: oneProduct.product.id,
                },
              },
              where: {
                [Op.and]: [
                  { ini_date: { [Op.lte]: today } },
                  { final_date: { [Op.gte]: today } },
                ],
              },
            });
            let discount_value;
            if (discount.length > 0) {
              discount_value = Math.max(
                ...discount.map((item) => item.discount_value)
              );
            } else {
              discount_value = 0;
            }

            const ingredients = await oneProduct.product.getIngredients({
              joinTableAttributes: ["amount"],
            }); //FUNCTION TO GET THE AMOUNT OF INGREDIENTS IN THAT PRODUCT

            //Executing the logic of sustracting amount of the ingredients in the product and updating it
            for (const oneIngredient of ingredients) {
              await models.Ingredient.update(
                {
                  amount:
                    oneIngredient.amount -
                    oneProduct.amount * oneIngredient.IngredientItem.amount,
                },
                {
                  where: {
                    id: oneIngredient.id,
                  },
                }
              );
            }
            //Executing operations in order to get the values for the join table
            const amount = oneProduct.amount;
            let totalIva =
              oneProduct.product.price *
              oneProduct.product.percentage_tax *
              amount;
            totalIvaBill += totalIva;
            let subtotal = oneProduct.product.price * amount;
            subtotalBill += subtotal;
            let total_discount =
              oneProduct.product.price * discount_value * amount;
            total_discountBill += total_discount;
            let item_total = subtotal + totalIva - total_discount;
            item_totalBill += item_total;
            
            newSale.addProducts(oneProduct.product, {
              through: {
                amount: amount,
                totalIva: totalIva,
                subtotal: subtotal,
                item_total: item_total,
                total_discount: total_discount,
              },
            });
          }

          const newBill = await models.Bill.create({
            nit: 966447851,
            sale_id: newSale.id,
            bill_time: newSale.sale_time,
            bill_date: newSale.sale_date,
            subtotal: subtotalBill,
            totalIva: totalIvaBill,
            total_discount: total_discountBill,
            total_payment: item_totalBill,
            bill_status: true,
          });

          res.json({
            message: "SUCCESS!!",
            data: newSale,
            newBill,
          });
        }
      } else {
        res.status(404).json({
          message: "There's not enought ingredients",
        });
      }
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateSale(req, res) {
  const { id } = req.params;
  const { sale_date, sale_time, docId, restaurant_id, sale_status, products } =
    req.body;

  let productError = false;
  let ingredientError = false;

  let productsOk = new Array();

  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const saleFound = await models.Sale.findOne({
      where: {
        id: id,
      },
    });

    if (!saleFound) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant) {
      if (saleFound.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You can't update sales for a different restaurant",
        });
      }
    }

    for (const oneProduct of products) {
      const product = await models.Product.findOne({
        where: {
          id: oneProduct.product_id,
        },
      });

      if (product) {
        const ingredients = await product.getIngredients({
          joinTableAttributes: ["amount"],
        });

        for (const oneIngredient of ingredients) {
          const finalAmount =
            oneIngredient.amount -
            oneProduct.amount * oneIngredient.IngredientItem.amount;

          if (finalAmount < 0) {
            ingredientError = true;
            break;
          }
        }

        productsOk.push({ product: product, amount: oneProduct.amount });
      } else {
        productError = true;
        break;
      }
    }

    if (!productError) {
      if (!ingredientError) {
        const saleFound = await models.Sale.findOne({
          where: {
            id: id,
          },
        });

        if (saleFound) {
          //Removing the change on the amount of the ingredients
          //because is changing products
          const oldProducts = await saleFound.getProducts({
            joinTableAttributes: ["amount"],
          });
          for (const oneProduct of oldProducts) {
            saleFound.removeProduct(oneProduct);

            const ingredients = await oneProduct.getIngredients({
              joinTableAttributes: ["amount"],
            });
            //Here we add because we're deleting products that were mistakenly selled
            for (const oneIngredient of ingredients) {
              const finalAmount =
                oneIngredient.amount +
                oneProduct.SaleItem.amount *
                  oneIngredient.IngredientItem.amount;

              await models.Ingredient.update(
                {
                  amount: finalAmount,
                },
                {
                  where: {
                    id: oneIngredient.id,
                  },
                }
              );
            }
          }

          const billFound = await models.Bill.findOne({
            where: {
              sale_id: id,
            },
          });

          //Variables for Bill
          let totalIvaBill = 0;
          let subtotalBill = 0;
          let total_discountBill = 0;
          let item_totalBill = 0;

          for (const oneProduct of productsOk) {
            const today = new Date(Date.now());

            //Getting discounts of the product that applies for today's date

            const discount = await models.Discount.findAll({
              include: {
                model: models.Product,
                where: {
                  id: oneProduct.product.id,
                },
              },
              where: {
                [Op.and]: [
                  { ini_date: { [Op.lte]: today } },
                  { final_date: { [Op.gte]: today } },
                ],
              },
            });
            let discount_value;
            //If there are more than one valid discount, determine the discount to use depending on the higher discount
            if (discount.length > 0) {
              discount_value = Math.max(
                ...discount.map((item) => item.discount_value)
              );
            } else {
              discount_value = 0;
            }
            const ingredients = await oneProduct.product.getIngredients({
              joinTableAttributes: ["amount"],
            }); //FUNCTION TO GET THE AMOUNT OF INGREDIENTS IN THAT PRODUCT

            //Executing the logic of sustracting amount of the ingredients in the product and updating it
            for (const oneIngredient of ingredients) {
              await models.Ingredient.update(
                {
                  amount:
                    oneIngredient.amount -
                    oneProduct.amount * oneIngredient.IngredientItem.amount,
                },
                {
                  where: {
                    id: oneIngredient.id,
                  },
                }
              );
            }

            //Executing operations in order to get the values for the join table
            const amount = oneProduct.amount;
            let totalIva = oneProduct.product.price * 0.19 * amount;
            totalIvaBill += totalIva;
            let subtotal = oneProduct.product.price * amount;
            subtotalBill += subtotal;
            let total_discount =
              oneProduct.product.price * discount_value * amount;
            total_discountBill += total_discount;
            let item_total = subtotal + totalIva - total_discount;
            item_totalBill += item_total;

            saleFound.addProducts(oneProduct.product, {
              through: {
                amount: amount,
                totalIva: totalIva,
                subtotal: subtotal,
                item_total: item_total,
                total_discount: total_discount,
              },
            });
          }

          const update = await models.Sale.update(
            {
              sale_date,
              sale_time,
              docId,
              restaurant_id,
              sale_status,
            },
            {
              where: {
                id: id,
              },
            }
          );

          if (update) {
            if (billFound) {
              await models.Bill.update(
                {
                  bill_time: sale_time,
                  bill_date: sale_date,
                  subtotal: subtotalBill,
                  totalIva: totalIvaBill,
                  total_discount: total_discountBill,
                  total_payment: item_totalBill,
                  bill_status: true,
                },
                {
                  where: {
                    id: billFound.id,
                  },
                }
              );
            }

            const newBill = await models.Bill.create({
              nit: 33333346,
              sale_id: saleFound.id,
              bill_time: saleFound.sale_time,
              bill_date: saleFound.sale_date,
              subtotal: subtotalBill,
              totalIva: totalIvaBill,
              total_discount: total_discountBill,
              total_payment: item_totalBill,
              bill_status: true,
            });

            res.json({
              message: "Sale updated successfully",
            });
          }
        }
      } else {
        res.status(404).json({
          message: "There's not enought ingredients for that products",
        });
      }
    } else {
      res.status(404).json({
        message: "There was a problem with the products",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function deleteSale(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const saleFound = await models.Sale.findOne({
      where: {
        id: id,
      },
    });

    if (!saleFound) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (saleFound.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You can't delete sales for a different restaurant",
        });
      }
    }

    const products = await saleFound.getProducts({
      joinTableAttributes: ["amount"],
    });

    for (const oneProduct of products) {
      const ingredients = await oneProduct.getIngredients({
        joinTableAttributes: ["amount"],
      });

      for (const oneIngredient of ingredients) {
        console.log(oneIngredient.IngredientItem.amount);
        await models.Ingredient.update(
          {
            amount:
              oneIngredient.amount -
              oneProduct.SaleItem.amount * oneIngredient.IngredientItem.amount,
          },
          {
            where: {
              id: oneIngredient.id,
            },
          }
        );
      }
    }

    const deleteRowCount = await models.Sale.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      mesage: "sale deleted succesfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getSalesDateRange(req, res) {
  const { initial_date, end_date } = req.body;

  const saleList = await models.Sale.findAll({
    where: {
      sale_date: {
        [Op.between]: [initial_date, end_date],
      },
    },
  });
  if (saleList.length > 0) {
    res.json({
      data: saleList,
    });
  } else {
    res.status(404).json({
      message: "Not sales found in that range",
    });
  }
}
