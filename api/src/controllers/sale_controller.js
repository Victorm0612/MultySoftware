const models = require("../models/index");
const { Op, json } = require("sequelize");

export async function getSales(req, res) {
  try {
    const sales = await models.Sale.findAll({
      include: [
        {
          model: models.User,
          attributes: [
            "document_type",
            "document_id",
            "first_name",
            "last_name",
          ],
        },
        {
          model: models.Restaurant,
          attributes: ["id", "restaurant_name", "restaurant_address"],
        },
        {
          model: models.SaleItem,
          attributes: [
            "product_id",
            "amount",
            "totalIva",
            "subtotal",
            "item_total",
            "total_discount",
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({
      data: sales,
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
    const sale = await models.Sale.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: models.User,
          attributes: [
            "document_type",
            "document_id",
            "first_name",
            "last_name",
          ],
        },
        {
          model: models.Restaurant,
          attributes: ["id", "restaurant_name", "restaurant_address"],
        },
        {
          model: models.SaleItem,
          attributes: [
            "product_id",
            "amount",
            "totalIva",
            "subtotal",
            "item_total",
            "total_discount",
          ],
        },
      ],
    });
    res.json({
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
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
          for (const oneProduct of productsOk) {
            const today = new Date(Date.now());

            //Getting discounts of the product that applies for today's date
            const discount = await oneProduct.product.getDiscounts({
              where: {
                [Op.and]: [
                  { ini_date: { [Op.gte]: today } },
                  { final_date: { [Op.lte]: today } },
                ],
              },
            });

            let discount_value;
            //If there are more than one valid discount, determine the discount to use depending on the higher discount
            if (discount.length > 0) {
              const higher = 0;
              for (const oneDiscount of discount) {
                higher =
                  oneDiscount.discount_value >= higher
                    ? oneDiscount.discount_value
                    : higher;
              }
              discount_value = higher;
            } else if (discount.length == 1) {
              discount_value = discount.discount_value;
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
            let item_total = oneProduct.product.price * amount;
            let total_discount =
              oneProduct.product.price * discount_value * amount;
            let subtotal = item_total - (totalIva + total_discount);

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
          res.json({
            message: "SUCCESS!!",
            data: newSale,
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

  let productsOk = new Array()

  try {

    for (const oneProduct of products) {
      const product = await models.Product.findOne({
        where : {
          id: oneProduct.product_id,
        }
      })

      if(product){
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

      if(!productError){
        if(!ingredientError){

          const saleFound = await models.Sale.findOne({
            where: {
              id: id
            }
          })

          if(saleFound){
            
            //Removing the change on the amount of the ingredients
            //because is changing products
            const oldProducts = await saleFound.getProducts({ joinTableAttributes: ["amount"]});
            for(const oneProduct of oldProducts){
              saleFound.removeProduct(oneProduct)

              const ingredients = await oneProduct.getIngredients({
                joinTableAttributes: ["amount"],
              });
              //Here we add because we're deleting products that were mistakenly selled
              for (const oneIngredient of ingredients) {
                const finalAmount =
                  oneIngredient.amount +
                  oneProduct.SaleItem.amount * oneIngredient.IngredientItem.amount;
                  
                await models.Ingredient.update(
                  {
                    amount: finalAmount,                    
                  },
                  {
                    where: {
                      id: oneIngredient.id,
                    }
                  }
                );
              }
            }

            for (const oneProduct of productsOk) {
              const today = new Date(Date.now());
  
              //Getting discounts of the product that applies for today's date
              const discount = await oneProduct.product.getDiscounts({
                where: {
                  [Op.and]: [
                    { ini_date: { [Op.gte]: today } },
                    { final_date: { [Op.lte]: today } },
                  ],
                },
              });
  
              let discount_value;
              //If there are more than one valid discount, determine the discount to use depending on the higher discount
              if (discount.length > 0) {
                const higher = 0;
                for (const oneDiscount of discount) {
                  higher =
                    oneDiscount.discount_value >= higher
                      ? oneDiscount.discount_value
                      : higher;
                }
                discount_value = higher;
              } else if (discount.length == 1) {
                discount_value = discount.discount_value;
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
              let item_total = oneProduct.product.price * amount;
              let total_discount =
                oneProduct.product.price * discount_value * amount;
              let subtotal = item_total - (totalIva + total_discount);
  
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

            if(update){
              res.json({
                message: "Sale updated successfully"
              })
            }

          }

        }else{
          res.status(404).json({
            message: "There's not enought ingredients for that products"
          })
        }
      }else{
        res.status(404).json({
          message: "There was a problem with the products"
        })
      }


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
