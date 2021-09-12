const models = require("../models/index");
import sequelize from "sequelize";

export async function getProductDiscounts(res) {
  try {
    const producDiscounts = await models.ProductDiscount.findAll();
    res.json({
      data: producDiscounts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function getOneProductDiscount(req, res) {
  const { id } = req.params;
  try {
    const producDiscount = models.ProductDiscount.findOne({
      where: {
        id: id,
      },
    });

    if(producDiscount){
      res.json({
        daga: producDiscount
      })
    }else{
      res.status(404).json({
        message: "ProductDiscount not found"
      })
    }
  } catch (error) {}
}

export async function create(req, res) {
  const { discount_id, product_id } = req.body;
  try {
    let newProductDiscount = await models.ProductDiscount.create({
      discount_id,
      product_id,
    });
    res.json({
      data: newProductDiscount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function updateProductDiscount(req, res) {
  const { id } = req.params;
  const { discount_id, product_id } = req.body;
  const productDiscountFound = await models.ProductDiscount.findAll({
    attributes: ["discount_id", "product_id"],
    where: {
      id: id,
    },
  });
  if (productDiscountFound.length > 0) {
    productDiscountFound.forEach(async (productDiscountFound) => {
      await models.ProductDiscount.update(
        {
          discount_id,
          product_id,
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
    message: "Product Discount updated successfully",
  });
}

export async function deleteProductDiscount(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.ProductDiscount.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Product Discount deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting ProductDiscount",
    });
  }
}
