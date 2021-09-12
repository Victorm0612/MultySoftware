const models = require("../models/index");

export async function getDiscounts(req, res) {
  try {
    const discounts = await models.Discount.findAll();
    res.json({
      data: discounts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function getOneDiscount(req, res) {
  const { id } = req.params;
  try {
    const discount = await models.Discount.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: discount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function create(req, res) {
  const { discount_name, discount_description, ini_date, discount_value, discount_status } = req.body;
  try {
    let newDiscount = await models.Discount.create({
      discount_name,
      discount_description,
      ini_date,
      discount_value,
      discount_status
    });
    if (newDiscount) {
      res.json({
        mesagge: "SUCCESS!!",
        data: newDiscount,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function updateDiscount(req, res) {
  const { id } = req.body;
  const [discount_name, discount_description, ini_date, discount_value, discount_status] = req.body;
  const discountFound = await models.Discount.findOne({
    attributes: ["discount_name", "discount_description", "ini_date", "discount_value", "discount_status"],
    where: {
      id: id,
    },
  });
  if(discountFound){
    const update = await models.Discount.update(
      {
        discount_name,
        discount_description,
        ini_date,
        discount_value,
        discount_status
      },
      {
        where: {
          id: id
        }
      })

      if (update) {
        res.json({
          message: "Discount updated successfully",
        });
      } else {
        res.status(403).json({
          message: "There was an error updating the discount",
        });
      }

  }else{
    res.status(404).json({
      message: "Discount not found",
    })
  }

  
}

export async function deleteDiscount(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = models.Discount.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Discount deleted succesfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Promo",
    });
  }
}
