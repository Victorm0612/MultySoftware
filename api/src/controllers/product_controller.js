import { sequelize } from "../models/index";

const models = require("../models/index");
const { QueryTypes } = require("sequelize");

export async function getProducts(req, res) {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          model: models.Category,
          as: "ProductCategory",
          attributes: ["id", "cat_name"],
        },
        {
          model: models.Discount,
          as: "ProductDiscount",
          attributes: ["id", "title", "dis_value"],
        },
        {
          model: models.Ingredient,
          as: "IngredientProduct",
          attributes: ["id", "ingredient_name", "price"],
        },
        {
          model: models.Promo,
          as: "ProductPromo",
          attributes: { exclude: ["createdAt", "updatedAt"] },
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
    pro_description,
    pro_image,
    price,
    category_id,
    discount_id,
    pro_status,
    percentage_tax,
  } = req.body;
  try {
    let newProduct = await models.Product.create({
      pro_description,
      pro_image,
      price,
      category_id,
      discount_id,
      pro_status,
      percentage_tax,
    });
    if (newProduct) {
      res.json({
        message: "SUCCESS",
        data: newProduct,
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
    pro_description,
    pro_image,
    price,
    category_id,
    discount_id,
    pro_status,
    percentage_tax,
  } = req.body;

  const productFound = await models.Product.findAll({
    attributes: [
      "pro_description",
      "pro_image",
      "price",
      "category_id",
      "discount_id",
      "pro_status",
      "percentage_tax",
    ],
    where: {
      id: id,
    },
  });
  if (productFound.length > 0) {
    productFound.forEach(async (productFound) => {
      await models.Product.update(
        {
          pro_description,
          pro_image,
          price,
          category_id,
          discount_id,
          pro_status,
          percentage_tax,
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
    message: "product updated succesfully",
  });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = models.Product.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "product delected succesfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getTop20(req, res) {
  const allTopProducts = await sequelize.query(
    `SELECT product_id, "Products".pro_description, "Products".pro_image, "Products".price, "Products".category_id, "Products".discount_id, "Products".pro_status, "Products".percentage_tax, COUNT(product_id) AS conteo FROM "SaleItems" INNER JOIN "Products" ON "SaleItems".product_id = "Products".id GROUP BY product_id,"Products".pro_description, "Products".pro_image, "Products".price, "Products".category_id, "Products".discount_id, "Products".pro_status, "Products".percentage_tax ORDER BY conteo DESC LIMIT 20 ;`,
    {
      type: QueryTypes.SELECT,
    }
  );

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
  const allBottomProducts = await sequelize.query(
    `SELECT product_id, "Products".pro_description, "Products".pro_image, "Products".price, "Products".category_id, "Products".discount_id, "Products".pro_status, "Products".percentage_tax, COUNT(product_id) AS conteo FROM "SaleItems" INNER JOIN "Products" ON "SaleItems".product_id = "Products".id GROUP BY product_id,"Products".pro_description, "Products".pro_image, "Products".price, "Products".category_id, "Products".discount_id, "Products".pro_status, "Products".percentage_tax ORDER BY conteo ASC LIMIT 20 ;`,
    {
      type: QueryTypes.SELECT,
    }
  );

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
