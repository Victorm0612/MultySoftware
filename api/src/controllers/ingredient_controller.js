const models = require("../models/index");
import sequelize from "sequelize";

export async function getIngredients(req, res) {
  try {
    const ingredients = await models.Ingredient.findAll();
    res.json({
      data: ingredients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function getOneIngredient(req, res) {
  const { id } = req.params;
  try {
    const ingredient = await models.Ingredient.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: ingredient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function create(req, res) {
  const { ingredient_name, price, amount} = req.body;
  try {
    let newIngredient = await models.Ingredient.create({
      ingredient_name,
      price,
      amount
    });
    if (newIngredient) {
      res.json({
        message: "SUCCESS",
        data: newIngredient,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateIngredient(req, res) {
  const { id } = req.params;
  const { ingredient_name, price, amount } = req.body;

  const ingredientFound = await models.Ingredient.findAll({
    attributes: ["ingredient_name", "price"],
    where: {
      id: id,
    },
  });
  if (ingredientFound.length > 0) {
    ingredientFound.forEach(
      async (ingredientFound) => {
        await models.Ingredient.update({
          ingredient_name,
          price,
          amount
        });
      },
      {
        where: {
          id: id,
        },
      }
    );
  }
  return res.json({
    message: "Ingredient updated succesfully",
  });
}

export async function deleteIngredient(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = models.Ingredient.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Ingredient deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the ingredient",
    });
  }
}
