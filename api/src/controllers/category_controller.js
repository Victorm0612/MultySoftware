const models = require("../models/index");

export async function getCategorys(req, res) {
  try {
    const categorys = await models.Category.findAll();
    res.json({
      data: categorys,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await models.Category.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const { cat_name, cat_description, cat_status } = req.body;
  try {
    let newCategory = await models.Category.create({
      cat_name,
      cat_description,
      cat_status,
    });
    if (newCategory) {
      res.json({
        message: "SUCCESS!!",
        data: newCategory,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { cat_name, cat_description, cat_status } = req.body;

  const categoryFound = await models.Category.findAll({
    attributes: ["cat_name", "cat_description", "cat_status"],
    where: {
      id: id,
    },
  });
  if (categoryFound.length > 0) {
    categoryFound.forEach(async (categoryFound) => {
      await models.Category.update(
        {
          cat_name,
          cat_description,
          cat_status,
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
    message: "Category updated succesfully",
  });
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Category.destroy({
      where: {
        id: id,
      },
    });
    
    if(deleteRowCount > 0) {
      return res.json({
        message: "Category deleted successfully",
        count: deleteRowCount,
      });
    }

    res.status(404).json({
      message: "That category does not exist"
    })

  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}
